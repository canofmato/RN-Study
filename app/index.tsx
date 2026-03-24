import { Image, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/*front card  */}
      <View style={styles.frontcard}>
        <View style={styles.name}>
          <View style={styles.name_info}>
            <View style={styles.name_info_logo}>
              <Image
                source={require("../assets/images/Info.png")}
                style={styles.icon}
              />
              <View style={styles.card}>
                <Text style={styles.label}>CARD</Text>
              </View>
            </View>

            <View>
              <Text style={styles.label}>(朴多璘) 박다인</Text>
            </View>
          </View>

          <Text style={styles.title}>PARK DA-IN</Text>
        </View>

        <View style={styles.info}>
          <View style={styles.link_section}>
            <View style={styles.link_goto}>
              <Image
                source={require("../assets/images/Github.png")}
                style={styles.icon}
              />
              <Image
                source={require("../assets/images/Velog.png")}
                style={styles.icon}
              />
            </View>
            <View style={styles.photo_section}>
              <Text style={styles.caption}>SIGNATURE{"\n"}PHOTO</Text>
              <Image
                source={require("../assets/images/Photo.png")}
                style={styles.photo}
              />
            </View>
          </View>

          <View style={styles.description}>
            <View style={styles.description_column}>
              <View style={styles.description_section}>
                <Text style={styles.caption}>NATIONALITY</Text>
                <Text style={styles.caption}>REPUBLIC OF KOREA</Text>
              </View>
              <View style={styles.description_section}>
                <Text style={styles.caption}>CONTACT</Text>
                <Text style={styles.caption}>GUNMANNDUU@GMAIL.COM</Text>
              </View>
            </View>

            <View style={styles.description_column}>
              <View style={styles.description_section}>
                <Text style={styles.caption}>DATE OF BIRTH</Text>
                <Text style={styles.caption}>2002.12.29</Text>
              </View>
              <View style={styles.description_section}>
                <Text style={styles.caption}>MOBILE</Text>
                <Text style={styles.caption}>010-3104-0784</Text>
              </View>
            </View>

            <View style={styles.detail}>
              <Text style={styles.mini}>
                ⚫ 안녕하세요 박다인입니다.⚫ 프론트엔드 개발자로써 다양한
                프로젝트 경험을 쌓아가고 있어요.⚫️ 도전하는 것을 좋아하고,
                새로움에 두려움 없이 도전해요.⚫️ 외향적인 성격이에요.⚫ 매콤한
                음식들을 좋아해요.(떡볶이와 훠궈)⚫ 경기도민입니다.⚫️ (ENTP)
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* back card */}
      <View style={styles.backcard}>
        <View style={styles.section}>
          <Text style={styles.label}>MORE(IG)</Text>
          <Image
            source={require("../assets/images/Arrow-right.png")}
            style={styles.arrow}
          />
          <Image
            source={require("../assets/images/QRcode.png")}
            style={styles.qrcode}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 24,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  frontcard: {
    width: 390,
    height: 230,
    backgroundColor: "#4FA9C8",
    borderRadius: 20,

    flexDirection: "column",

    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    width: 348,
    flexDirection: "column",
    gap: 4,
  },
  name_info: {
    flexDirection: "row",
    gap: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  name_info_logo: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  card: {
    width: 40,
    height: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    width: 348,
    flexDirection: "row",
    paddingHorizontal: 5,
    justifyContent: "space-between",
  },
  link_section: {
    height: 100,
    flexDirection: "column",
    gap: 4,
  },
  link_goto: {
    flexDirection: "row",
    gap: 8,
  },
  photo_section: {
    flexDirection: "column",
    gap: 4,
  },
  photo: {
    width: 43,
    height: 43,
    resizeMode: "contain",
  },
  description: {
    width: 240,
    flexDirection: "column",
    gap: 12,
    paddingVertical: 3,
  },
  description_column: {
    width: 200,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  description_section: {
    width: 110,
    gap: 4,
    flexDirection: "column",
  },
  detail: {
    width: 240,
    gap: 8,
    paddingLeft: 8,
    borderLeftWidth: 1.5,
    borderLeftColor: "#1E1E1E",
  },

  backcard: {
    width: 390,
    height: 230,
    backgroundColor: "#4FA9C8",
    borderRadius: 20,

    paddingHorizontal: 22, //px-[22px]
    paddingVertical: 34, //py-[34px]

    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    flexDirection: "row",
    gap: 40,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Roboto-SemiBold",
    fontSize: 64,
    color: "#1E1E1E",
  },
  label: {
    fontFamily: "Roboto-regular",
    fontSize: 12,
    color: "#1E1E1E",
  },
  caption: {
    fontFamily: "Roboto-regular",
    fontSize: 8,
    color: "#1E1E1E",
  },
  mini: {
    fontFamily: "Roboto-regular",
    fontSize: 6,
    color: "#1E1E1E",
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain", //이미지가 잘리지 않게 비율 유지
  },
  arrow: {
    width: 12,
    height: 12,
    resizeMode: "contain", //이미지가 잘리지 않게 비율 유지
  },
  qrcode: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
});
