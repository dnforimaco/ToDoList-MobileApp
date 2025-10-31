import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ModalPropsDocumentation() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>React Native Modal Props Documentation</Text>

      <View style={styles.table}>
        <Text style={styles.tableTitle}>Modal Component Props & Testing Results</Text>

        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.propColumn]}>Prop</Text>
          <Text style={[styles.headerCell, styles.typeColumn]}>Type</Text>
          <Text style={[styles.headerCell, styles.descColumn]}>Description</Text>
          <Text style={[styles.headerCell, styles.testColumn]}>Test Result</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.propCell}>visible</Text>
          <Text style={styles.typeCell}>boolean</Text>
          <Text style={styles.descCell}>Controls modal visibility</Text>
          <Text style={styles.testCell}>✅ Working - Controls show/hide</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.propCell}>animationType</Text>
          <Text style={styles.typeCell}>enum: 'none', 'slide', 'fade'</Text>
          <Text style={styles.descCell}>Animation when modal appears/disappears</Text>
          <Text style={styles.testCell}>✅ Tested: 'slide' works smoothly</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.propCell}>transparent</Text>
          <Text style={styles.typeCell}>boolean</Text>
          <Text style={styles.descCell}>Modal background transparency</Text>
          <Text style={styles.testCell}>✅ Working - Shows overlay effect</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.propCell}>onRequestClose</Text>
          <Text style={styles.typeCell}>function</Text>
          <Text style={styles.descCell}>Android back button handler</Text>
          <Text style={styles.testCell}>✅ Implemented - Closes modal</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.propCell}>onShow</Text>
          <Text style={styles.typeCell}>function</Text>
          <Text style={styles.descCell}>Callback when modal becomes visible</Text>
          <Text style={styles.testCell}>✅ Working - Logs to console</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.propCell}>presentationStyle</Text>
          <Text style={styles.typeCell}>enum: 'fullScreen', 'pageSheet', 'formSheet', 'overFullScreen'</Text>
          <Text style={styles.descCell}>iOS presentation style</Text>
          <Text style={styles.testCell}>⚠️ iOS only - Not tested on Android</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.propCell}>hardwareAccelerated</Text>
          <Text style={styles.typeCell}>boolean</Text>
          <Text style={styles.descCell}>Hardware acceleration on Android</Text>
          <Text style={styles.testCell}>⚠️ Android only - Default behavior</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.propCell}>supportedOrientations</Text>
          <Text style={styles.typeCell}>array of enums</Text>
          <Text style={styles.descCell}>Supported device orientations</Text>
          <Text style={styles.testCell}>⚠️ Not tested - Using default</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.propCell}>statusBarTranslucent</Text>
          <Text style={styles.typeCell}>boolean</Text>
          <Text style={styles.descCell}>Status bar translucency on Android</Text>
          <Text style={styles.testCell}>⚠️ Android only - Not tested</Text>
        </View>
      </View>

      <View style={styles.observations}>
        <Text style={styles.observationsTitle}>📋 Observations & Test Results:</Text>

        <Text style={styles.observationItem}>
          ✅ <Text style={styles.bold}>Animation Performance:</Text> 'slide' animation provides smooth transition
        </Text>

        <Text style={styles.observationItem}>
          ✅ <Text style={styles.bold}>Transparency Effect:</Text> transparent={true} creates proper overlay with background content visible
        </Text>

        <Text style={styles.observationItem}>
          ✅ <Text style={styles.bold}>Platform Handling:</Text> onRequestClose properly handles Android back button
        </Text>

        <Text style={styles.observationItem}>
          ⚠️ <Text style={styles.bold}>iOS Specific:</Text> presentationStyle and other iOS-only props need iOS device testing
        </Text>

        <Text style={styles.observationItem}>
          ⚠️ <Text style={styles.bold}>Android Specific:</Text> hardwareAccelerated and statusBarTranslucent need Android testing
        </Text>

        <Text style={styles.observationItem}>
          ✅ <Text style={styles.bold}>Cross-platform Compatibility:</Text> Basic modal functionality works consistently
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  table: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#5e0acc',
    color: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    padding: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  propColumn: { flex: 0.2 },
  typeColumn: { flex: 0.25 },
  descColumn: { flex: 0.35 },
  testColumn: { flex: 0.2 },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  propCell: {
    flex: 0.2,
    padding: 12,
    textAlign: 'center',
    fontFamily: 'monospace',
    color: '#333',
  },
  typeCell: {
    flex: 0.25,
    padding: 12,
    textAlign: 'center',
    color: '#555',
  },
  descCell: {
    flex: 0.35,
    padding: 12,
    textAlign: 'left',
    color: '#333',
  },
  testCell: {
    flex: 0.2,
    padding: 12,
    textAlign: 'center',
    color: '#666',
  },
  observations: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  observationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  observationItem: {
    marginBottom: 12,
    lineHeight: 20,
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
});
