import { StyleSheet } from "react-native";

export const colors = {
  navy: "#0C447C",
  blue: "#185FA5",
  blueMid: "#378ADD",
  blueLight: "#B5D4F4",
  bluePale: "#E6F1FB",
  white: "#fff",
  text: "#042C53",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.navy,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 20,
  },
  headerLabel: {
    fontSize: 12,
    color: colors.blueLight,
    letterSpacing: 1,
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "500",
    color: colors.white,
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 13,
    color: colors.blueLight,
  },
  inputRow: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    gap: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.blueLight,
    backgroundColor: colors.bluePale,
    fontSize: 14,
    color: colors.text,
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.blue,
    justifyContent: "center",
  },
  addButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "500",
  },
  listContent: {
    paddingHorizontal: 20,
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.bluePale,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
  },
  checkButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderColor: colors.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },
  checkText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "500",
  },
  itemText: {
    flex: 1,
    fontSize: 15,
  },
  deleteButton: {
    fontSize: 18,
    color: colors.blueLight,
    lineHeight: 22,
  },
  footer: {
    borderTopWidth: 0.5,
    borderTopColor: colors.bluePale,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  clearButton: {
    fontSize: 12,
    color: colors.blueMid,
    fontWeight: "500",
  },
});
