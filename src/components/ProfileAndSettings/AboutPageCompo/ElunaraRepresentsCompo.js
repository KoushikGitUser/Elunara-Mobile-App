import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { scaleFont } from "../../../utils/responsive";
import ElunaraLogoIcon from "../../../../assets/SvgIconsComponent/ElunaraLogoIcon";
import elunaraLogo from '../../../assets/images/elunaraLogo.png';
import ChakraIcon from '../../../../assets/SvgIconsComponent/AboutIcons/ChakraBigIcon'
import NaraIcon from "../../../../assets/SvgIconsComponent/AboutIcons/NaraIcon";

const { width } = Dimensions.get("window");

const ElunaraRepresentsCompo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            What does
          </Text>
          <Image source={elunaraLogo} style={{height:30,width:100,marginTop:8}} />
          <Text style={styles.headerText}>
             represent?
          </Text>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          A bridge to enlightenment, connecting students to knowledge.
        </Text>

        {/* Definitions Box */}
        <View style={styles.definitionsBox}>
          {/* Elu = Elumination */}
          <View style={styles.definitionRow}>
            <Text style={styles.wordPart}>Elu</Text>
            <Text style={styles.equals}> = </Text>
            <Text style={styles.meaning}>Elumination</Text>
          </View>

          {/* nara = Knowledge, Human Being */}
          <View style={[styles.definitionRow, styles.middleRow]}>
            <NaraIcon/>
            <Text style={styles.equals}> = </Text>
            <Text style={styles.meaning}>Knowledge, Human Being</Text>
          </View>

          {/* Flower of Life = Knowledge Chakra */}
          <View style={styles.definitionRow}>
            <ChakraIcon/>
            <Text style={styles.equals}> = </Text>
            <Text style={styles.meaning}>Knowledge Chakra</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:20
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    width: "100%",
    borderWidth:1,
    borderColor:"#D3DAE5"
  },
  header: {
    marginBottom: 8,
    flexDirection:"row",
    gap:10,
    alignItems:"center"
  },
  headerText: {
    fontSize: scaleFont(16),
    color: '#333333',
    fontWeight: '600',
    lineHeight: 28,
  },
  brandName: {
    color: '#333333',
    fontWeight: '700',
    fontSize: 24,
  },
  registered: {
    fontSize: 10,
    color: '#666666',
    fontWeight: '400',
  },
  tagline: {
    fontSize: 9,
    color: '#999999',
    fontStyle: 'italic',
    marginTop: 2,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: scaleFont(14),
    color: '#757575',
    marginBottom: 20,
    lineHeight: 20,
    fontWeight: '400',
  },
  definitionsBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    padding: 16,
    paddingVertical: 20,
  },
  definitionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleRow: {
    marginVertical: 20,
  },
  wordPart: {
    fontSize: 26,
    fontWeight: '600',
    color: '#000000',
    marginRight:5,
    letterSpacing:0.5
  },
  equals: {
    fontSize: 18,
    color: '#666666',
    marginHorizontal: 0,
    marginRight:5
  },
  meaning: {
    fontSize: scaleFont(14),
    color: '#666666',
    fontWeight: '400',
    flex: 1,
  },
});

export default ElunaraRepresentsCompo;
