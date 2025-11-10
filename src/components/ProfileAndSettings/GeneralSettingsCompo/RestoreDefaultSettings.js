import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import RestoreIcon from '../../../../assets/SvgIconsComponent/GeneralSettingsIcon/RestoreIcon'
import { scaleFont } from '../../../utils/responsive'
import { ChevronRight } from 'lucide-react-native'
import { useDispatch } from 'react-redux'
import { setToggleResetSettingsPopup } from '../../../redux/slices/toggleSlice'

const RestoreDefaultSettings = () => {
    const dispatch = useDispatch();
  return (
    <TouchableOpacity onPress={()=>dispatch(setToggleResetSettingsPopup(true))} style={styles.content}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <RestoreIcon/>
          <Text style={styles.title}>Restore Default Settings</Text>
          <ChevronRight size={30} style={{marginLeft:"auto"}} strokeWidth={1.25} />
        </View>
        <Text style={styles.subtitle}>
          Restores all settings to default without deleting your data. Use to fix issues or start fresh.
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    marginBottom: 45,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellIcon: {
    marginRight: 16,
  },
  title: {
    fontSize: scaleFont(17),
    fontWeight: "600",
    color: "#1F2937",
    letterSpacing: -0.5,
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: scaleFont(13),
    color: "#6B7280",
    marginTop: 10,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 24,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  settingDescription: {
    fontSize: scaleFont(13),
    color: "#6B7280",
  },
});

export default RestoreDefaultSettings