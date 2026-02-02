import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, Linking, Platform } from 'react-native'
import React from 'react'
import { Download } from 'lucide-react-native';
import WhatsappIcon from '../../../../../assets/SvgIconsComponent/MessagesIcons/WhatsappIcon';
import LinkedInIcon from '../../../../../assets/SvgIconsComponent/MessagesIcons/LinkedInIcon';
import ZoomIcon from '../../../../../assets/SvgIconsComponent/MessagesIcons/ZoomIcon';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { triggerToast } from '../../../../services/toast';
 

const MessageSharePopup = ({setSharePopup,messageContent}) => {
 
  const openWhatsApp = async () => {
    const url = `whatsapp://send?text=${encodeURIComponent(messageContent)}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      triggerToast("WhatsApp not installed", "Please install WhatsApp to share", "error", 3000);
    }
  };

  const openLinkedIn = async () => {
    // LinkedIn app scheme
    const linkedInAppUrl = Platform.OS === 'ios' ? 'linkedin://' : 'linkedin://';
    const canOpenApp = await Linking.canOpenURL(linkedInAppUrl);

    if (canOpenApp) {
      // LinkedIn doesn't support direct text sharing via deep link
      // Open LinkedIn app and user can create a post manually
      // We'll use the share URL which opens in the app if installed
      const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://elunara.com')}&summary=${encodeURIComponent(messageContent)}`;
      Linking.openURL(shareUrl);
    } else {
      triggerToast("LinkedIn not installed", "Please install LinkedIn to share", "error", 3000);
    }
  };

  const openZoom = async () => {
    // Zoom app scheme
    const zoomAppUrl = Platform.OS === 'ios' ? 'zoomus://' : 'zoomus://';
    const canOpenApp = await Linking.canOpenURL(zoomAppUrl);

    if (canOpenApp) {
      // Zoom doesn't support direct text sharing
      // Open the Zoom app - user can share in chat manually
      Linking.openURL(zoomAppUrl);
      triggerToast("Zoom opened", "You can paste the content in Zoom chat", "success", 3000);
    } else {
      triggerToast("Zoom not installed", "Please install Zoom to share", "error", 3000);
    }
  };

  const handleDownload = async () => {
    try {
      // Create HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body {
              font-family: 'Helvetica', 'Arial', sans-serif;
              padding: 20px;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              border-bottom: 2px solid #D3DAE5;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              color: #1F2937;
              margin-bottom: 5px;
            }
            .date {
              font-size: 12px;
              color: #6B7280;
            }
            .content {
              font-size: 14px;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="title">AI Response</div>
              <div class="date">${new Date().toLocaleString()}</div>
            </div>
            <div class="content">${messageContent.replace(/\n/g, '<br>')}</div>
          </div>
        </body>
        </html>
      `;

      // Create PDF
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false
      });

      // Check if sharing is available
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          UTI: '.pdf',
          mimeType: 'application/pdf',
          dialogTitle: 'Share AI Response'
        });
        triggerToast("PDF created successfully", "", "success", 3000);
      } else {
        triggerToast("Sharing is not available on this device", "", "error", 3000);
      }

      setSharePopup(false);
    } catch (error) {
      console.error('Error creating PDF:', error);
      triggerToast("Failed to create PDF", "", "error", 3000);
    }
  };



  return (
    <>
      <TouchableOpacity
        onPress={() => setSharePopup(false)}
        style={styles.optionsPopupWrapper}
      ></TouchableOpacity>
      <View style={styles.notesPopup}>
        <Pressable
          onPress={() => {
            setSharePopup(false);
            handleDownload();
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <Download strokeWidth={1.25} />
          <Text style={{fontFamily:"Mukta-Regular",fontSize:17}}>Download</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSharePopup(false);
            openWhatsApp();
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <WhatsappIcon/>
          <Text style={{fontFamily:"Mukta-Regular",fontSize:17}}>Whatsapp</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSharePopup(false);
            openLinkedIn();
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
         <LinkedInIcon/>
          <Text style={{fontFamily:"Mukta-Regular",fontSize:17}}>LinkedIn</Text>
        </Pressable>
                <Pressable
          onPress={() => {
            setSharePopup(false);
            openZoom();
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
         <ZoomIcon/>
          <Text style={{fontFamily:"Mukta-Regular",fontSize:17}}>Zoom</Text>
        </Pressable>
      </View>
    </>
  )
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  notesPopup: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 21,
    padding: 7,
    width: "auto",
    bottom: 33,
    left: 27,
    zIndex: 999,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 5,
  },
  notesPopupOptions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
    width: "100%",
    height: 45,
    padding: 9,
    borderRadius: 12,
    paddingRight: 40,
  },
  optionsPopupWrapper: {
    position: "absolute",
    bottom: 0,
    left: -20,
    width,
    height,
    zIndex: 99,
    backgroundColor: "transparent",
  },
});

export default MessageSharePopup