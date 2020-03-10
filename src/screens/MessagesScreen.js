import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { SimpleLineIcons } from "@expo/vector-icons";

import MasonryGrid from "../components/MasonryGrid";
import Message from "../components/Message";
import Badge from "../components/Badge";
import BottomSheet from "../components/BottomSheet";

const ScreenWrapper = styled.View`
  flex: 1;
  background-color: #000000;
`;

const Messages = styled.ScrollView`
  background-color: ${props => props.theme.colorBg};
  height: auto;
`;

const Hero = styled.View`
  flex-direction: row;
  height: ${Dimensions.get("window").height * 0.3}px;
  background-color: ${props => props.theme.colorAccent};
  border-bottom-right-radius: 50px;
  padding: 40px 20px 20px 20px;
`;

const HeroContent = styled.View`
  width: 60%;
`;

const HeroImage = styled.Image`
  position: absolute;
  right: -5%;
  top: 0;
  width: 80%;
  height: ${Dimensions.get("window").height * 0.3}px;
`;

const HeroTitle = styled.Text`
  font-family: "${props => props.theme.fontPrimary}";
  font-size: 36px;
  color: ${props => props.theme.colorBg};
  margin-bottom: auto;
`;

const Tools = styled.View`
  height: 50%;
  justify-content: space-between;
`;

const SearchBarWrapper = styled.View`
  width: 100%;
`;

const SearchBarIcon = styled(SimpleLineIcons)`
  position: absolute;
  left: 15px;
  top: 10px;
`;

const SearchBar = styled.TextInput`
  width: 100%;
  background-color: ${props => props.theme.colorWhite};
  border-radius: 10px;
  padding: 10px 35px;
  font-family: "${props => props.theme.fontSecondary}";
  font-size: 14px;
`;

const ButtonsRow = styled.View`
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  padding: 2.5px 15px;
  border: 1px solid ${props => props.theme.colorWhite};
  border-radius: 8px;
`;

const ButtonLabel = styled.Text`
  font-family: "${props => props.theme.fontSecondary}";
  font-size: 14px;
  color: ${props => props.theme.colorWhite};
`;

const BsContentSection = styled.View`
  margin-bottom: 40px;
`;

const BsContentSectionTitle = styled.Text`
  color: ${props => props.theme.colorText};
  font-size: 20px;
  font-family: "${props => props.theme.fontPrimary}";
  margin-bottom: 20px;
`;

const FiltersRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const FiltersToggle = styled.TouchableOpacity``;

const FiltersBadge = styled(Badge)`
  margin-right: 20px;
  margin-bottom: 15px;
  background-color: ${props => {
    if (props.toggled) {
      if (props.type === "Notice") {
        return "#0080ff";
      } else if (props.type === "Event") {
        return "#ff00ff";
      } else if (props.type === "Admin") {
        return "#8000ff";
      }
    } else {
      return props.theme.colorInactiveGrey;
    }
  }};
`;

const SortOption = styled.TouchableOpacity``;

const SortOptionLabel = styled.Text`
  color: ${props =>
    props.selected ? props => props.theme.colorAccent : props.theme.colorText};
  font-size: 14px;
  font-family: "${props => props.theme.fontSecondary}";
  margin-bottom: 15px
`;

const BsButtonsRow = styled.View`
  align-self: center;
  flex-direction: row;
  justify-content: space-evenly;
  width: 70%;
`;

const BsButton = styled.TouchableOpacity``;

const BsButtonLabel = styled.Text`
  color: ${props =>
    props.active
      ? props => props.theme.colorAccent
      : props.theme.colorInactiveGrey};
  font-size: 20px;
  font-family: "${props => props.theme.fontPrimary}";
`;

const Overlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const data = [
  {
    createdDate: new Date(2020, 2, 1),
    targetDetails: {
      targetDate: new Date(2020, 2, 21),
      targetDateType: "occurence",
      targetLocation: null
    },
    type: "Notice",
    title: "School cancelled on 21st March for spring cleaning",
    publisher: {
      publisherName: "Ms Chen",
      publisherPic: require("../../assets/images/profile-stock-one.jpg")
    },
    response: {
      responseType: "Acknowledgement",
      deadline: new Date(2020, 3, 20),
      responded: false
    }
  },
  {
    createdDate: new Date(2020, 2, 5),
    targetDetails: {
      targetDate: new Date(2020, 3, 4),
      targetDateType: "occurence",
      targetLocation: "1018 East Coast Parkway, Singapore 449877"
    },
    type: "Event",
    title: "Excursion to East Coast Beach on 4th April 2020",
    publisher: {
      publisherName: "Mr Lim",
      publisherPic: require("../../assets/images/profile-stock-two.jpg")
    },
    response: {
      responseType: "Consent",
      deadline: new Date(2020, 3, 29),
      responded: true
    }
  },
  {
    createdDate: new Date(2020, 2, 10),
    targetDetails: {
      targetDate: null,
      targetDateType: null,
      targetLocation: null
    },
    type: "Notice",
    title:
      "Excursion to Singapore Zoo on 15th March 2020 cancelled due to COVID-19",
    publisher: {
      publisherName: "Mr Lim",
      publisherPic: require("../../assets/images/profile-stock-two.jpg")
    },
    response: {
      responseType: "",
      deadline: null,
      responded: null
    }
  },
  {
    createdDate: new Date(2020, 2, 24),
    targetDetails: {
      targetDate: null,
      targetDateType: null,
      targetLocation: null
    },
    type: "Notice",
    title: "Sign up for Art-4-Good Competition",
    publisher: {
      publisherName: "Mdm Teo",
      publisherPic: require("../../assets/images/profile-stock-three.jpg")
    },
    response: {
      responseType: "",
      deadline: null,
      responded: null
    }
  },
  {
    createdDate: new Date(2020, 2, 2),
    targetDetails: {
      targetDate: new Date(2020, 3, 22),
      targetDateType: "occurence",
      targetLocation:
        "1 Fifth Ave, #02-01/02/03/04 Guthrie House, Singapore 268802"
    },
    type: "Event",
    title: "Learning journey to Singapore Origami Center on 4th April 2020",
    publisher: {
      publisherName: "Mr Lim",
      publisherPic: require("../../assets/images/profile-stock-two.jpg")
    },
    response: {
      responseType: "Consent",
      deadline: new Date(2020, 4, 19),
      responded: false
    }
  },
  {
    createdDate: new Date(2020, 3, 1),
    targetDetails: {
      targetDate: new Date(2020, 2, 31),
      targetDateType: "deadline",
      targetLocation: null
    },
    type: "Admin",
    title: "School fees for March 2020",
    publisher: {
      publisherName: "Ms Chen",
      publisherPic: require("../../assets/images/profile-stock-one.jpg")
    },
    response: {
      responseType: "Acknowledgement",
      deadline: new Date(2020, 3, 20),
      responded: true
    }
  }
];

const MessagesScreen = ({ navigation }) => {
  const bsRef = useRef();
  const bsAnimNode = useRef(new Animated.Value(1));

  const [changesMade, setChangesMade] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    Notice: true,
    Event: true,
    Admin: true
  });
  const [appliedSort, setAppliedSort] = useState("Most Recent First");
  const [pendingFilters, setPendingFilters] = useState({
    Notice: true,
    Event: true,
    Admin: true
  });
  const [pendingSort, setPendingSort] = useState("Most Recent First");

  return (
    <ScreenWrapper>
      <Overlay
        style={{
          opacity: Animated.interpolate(bsAnimNode.current, {
            inputRange: [0, 1],
            outputRange: [0.2, 1],
            extrapolate: Animated.Extrapolate.CLAMP
          })
        }}
      >
        <Messages showsVerticalScrollIndicator={false}>
          <Hero>
            <HeroImage
              source={require("../../assets/images/messages-hero.png")}
            />
            <HeroContent>
              <HeroTitle>Messages</HeroTitle>
              <Tools>
                <SearchBarWrapper>
                  <SearchBar
                    placeholder="Search"
                    placeholderTextColor="#bfbfbf"
                  />
                  <SearchBarIcon name="magnifier" size={15} color={"grey"} />
                </SearchBarWrapper>
                <ButtonsRow>
                  <Button
                    onPress={() => {
                      setPendingFilters(appliedFilters);
                      setPendingSort(appliedSort);
                      requestAnimationFrame(() => bsRef.current.snapTo(0));
                    }}
                  >
                    <ButtonLabel>Organise</ButtonLabel>
                  </Button>
                  <Button style={{ marginLeft: 10 }}>
                    <ButtonLabel>Publish</ButtonLabel>
                  </Button>
                </ButtonsRow>
              </Tools>
            </HeroContent>
          </Hero>
          <MasonryGrid
            style={{ paddingRight: 20, paddingBottom: 20, paddingLeft: 20 }}
            cols={2}
            gap={20}
            data={data}
            childGenFunc={d => (
              <Message
                key={d.title}
                onPress={() =>
                  navigation.navigate("MessagesEntry", {
                    ...d,
                    createdDate: JSON.stringify(d.createdDate),
                    targetDetails: JSON.stringify(d.targetDetails),
                    response: JSON.stringify(d.response)
                  })
                }
                datum={d}
              />
            )}
          />
        </Messages>
      </Overlay>
      <BottomSheet
        ref={bsRef}
        snapPoints={["80%", "0%"]}
        initialSnap={1}
        callbackNode={bsAnimNode.current}
        onCloseEnd={() => setChangesMade(false)}
      >
        <BsContentSection>
          <BsContentSectionTitle>Filters</BsContentSectionTitle>
          <FiltersRow>
            <FiltersToggle
              onPress={() => {
                setPendingFilters({
                  ...pendingFilters,
                  Notice: !pendingFilters["Notice"]
                });
                setChangesMade(true);
              }}
            >
              <FiltersBadge type="Notice" toggled={pendingFilters["Notice"]}>
                Notice {pendingFilters["Notice"] ? "✓" : "✗"}
              </FiltersBadge>
            </FiltersToggle>
            <FiltersToggle
              onPress={() => {
                setPendingFilters({
                  ...pendingFilters,
                  Event: !pendingFilters["Event"]
                });
                setChangesMade(true);
              }}
            >
              <FiltersBadge type="Event" toggled={pendingFilters["Event"]}>
                Event {pendingFilters["Event"] ? "✓" : "✗"}
              </FiltersBadge>
            </FiltersToggle>
            <FiltersToggle
              onPress={() => {
                setPendingFilters({
                  ...pendingFilters,
                  Admin: !pendingFilters["Admin"]
                });
                setChangesMade(true);
              }}
            >
              <FiltersBadge type="Admin" toggled={pendingFilters["Admin"]}>
                Admin {pendingFilters["Admin"] ? "✓" : "✗"}
              </FiltersBadge>
            </FiltersToggle>
          </FiltersRow>
        </BsContentSection>
        <BsContentSection>
          <BsContentSectionTitle>Sort</BsContentSectionTitle>
          <SortOption
            onPress={() => {
              setPendingSort("Most Recent First");
              setChangesMade(true);
            }}
          >
            <SortOptionLabel selected={pendingSort === "Most Recent First"}>
              Most Recent First{" "}
              {pendingSort === "Most Recent First" ? "✓" : null}
            </SortOptionLabel>
          </SortOption>
          <SortOption
            onPress={() => {
              setPendingSort("Priority");
              setChangesMade(true);
            }}
          >
            <SortOptionLabel selected={pendingSort === "Priority"}>
              Priority {pendingSort === "Priority" ? "✓" : null}
            </SortOptionLabel>
          </SortOption>
          <SortOption
            onPress={() => {
              setPendingSort("Notice Items First");
              setChangesMade(true);
            }}
          >
            <SortOptionLabel selected={pendingSort === "Notice Items First"}>
              Notice Items First{" "}
              {pendingSort === "Notice Items First" ? "✓" : null}
            </SortOptionLabel>
          </SortOption>
          <SortOption
            onPress={() => {
              setPendingSort("Event Items First");
              setChangesMade(true);
            }}
          >
            <SortOptionLabel selected={pendingSort === "Event Items First"}>
              Event Items First{" "}
              {pendingSort === "Event Items First" ? "✓" : null}
            </SortOptionLabel>
          </SortOption>
          <SortOption
            onPress={() => {
              setPendingSort("Admin Items First");
              setChangesMade(true);
            }}
          >
            <SortOptionLabel selected={pendingSort === "Admin Items First"}>
              Admin Items First{" "}
              {pendingSort === "Admin Items First" ? "✓" : null}
            </SortOptionLabel>
          </SortOption>
        </BsContentSection>
        <BsContentSection style={{ marginTop: "auto" }}>
          <BsButtonsRow style={{ alignItems: "center" }}>
            <BsButton
              onPress={() => {
                requestAnimationFrame(() => bsRef.current.snapTo(1));
                setAppliedFilters(pendingFilters);
                setAppliedSort(pendingSort);
              }}
              disabled={!changesMade}
            >
              <BsButtonLabel active={changesMade}>Apply</BsButtonLabel>
            </BsButton>
            <BsButton onPress={() => bsRef.current.snapTo(1)}>
              <BsButtonLabel active={true}>Cancel</BsButtonLabel>
            </BsButton>
          </BsButtonsRow>
        </BsContentSection>
      </BottomSheet>
    </ScreenWrapper>
  );
};

export default MessagesScreen;
