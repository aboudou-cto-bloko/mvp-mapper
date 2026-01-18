import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 30,
    borderBottom: "2 solid #000",
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 10,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "uppercase",
    color: "#000",
    letterSpacing: 0.5,
  },
  sectionPrompt: {
    fontSize: 9,
    color: "#666",
    marginBottom: 8,
    fontStyle: "italic",
  },
  content: {
    fontSize: 11,
    lineHeight: 1.6,
    color: "#333",
  },
  ideaBox: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    marginBottom: 25,
    borderRadius: 4,
    borderLeft: "4 solid #000",
  },
  ideaText: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#333",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: "1 solid #DDD",
    paddingTop: 10,
    fontSize: 8,
    color: "#999",
    textAlign: "center",
  },
  divider: {
    borderBottom: "1 solid #E0E0E0",
    marginVertical: 15,
  },
});

// Composant PDF Document
export const BriefPDFDocument = ({ briefData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>MVP BRIEF</Text>
        <Text style={styles.subtitle}>
          Generated on{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>

      {/* Original Idea */}
      <View style={styles.ideaBox}>
        <Text style={styles.sectionTitle}>ORIGINAL IDEA</Text>
        <Text style={styles.ideaText}>&quot;{briefData.idea}&quot;</Text>
      </View>

      {/* The Problem */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>THE PROBLEM</Text>
        <Text style={styles.sectionPrompt}>
          What specific frustration does this solve?
        </Text>
        <Text style={styles.content}>{briefData.problem}</Text>
      </View>

      <View style={styles.divider} />

      {/* Target User */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TARGET USER (ICP)</Text>
        <Text style={styles.sectionPrompt}>
          Who has this problem MOST? Where do they hang out?
        </Text>
        <Text style={styles.content}>{briefData.icp}</Text>
      </View>

      <View style={styles.divider} />

      {/* Core Feature */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CORE FEATURE</Text>
        <Text style={styles.sectionPrompt}>
          What&apos;s the ONE action your MVP must let them do?
        </Text>
        <Text style={styles.content}>{briefData.feature}</Text>
      </View>

      <View style={styles.divider} />

      {/* Non-Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>OUT OF SCOPE (V1)</Text>
        <Text style={styles.sectionPrompt}>
          What you WON&apos;T build in v1
        </Text>
        <Text style={styles.content}>{briefData.nonFeatures}</Text>
      </View>

      <View style={styles.divider} />

      {/* Build Scope */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7-DAY BUILD ROADMAP</Text>
        <Text style={styles.sectionPrompt}>
          Break down into buildable pieces
        </Text>
        <Text style={styles.content}>{briefData.buildScope}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Built with Project Clarity frameworks • mvp-mapper.com</Text>
      </View>
    </Page>
  </Document>
);
