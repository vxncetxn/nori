import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { SimpleLineIcons } from "@expo/vector-icons";

import { IdentityContext, DataContext } from "../Context";

import ImageTint from "../components/ImageTint";
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

const Hero = styled.ImageBackground`
  flex-direction: row;
  height: ${Dimensions.get("window").height * 0.4}px;
  background-color: ${props => props.theme.colorAccent};
  border-bottom-right-radius: 50px;
  padding: 40px 20px 20px 20px;
  overflow: hidden;
`;

const HeroContent = styled.View`
  width: 60%;
`;

const HeroImage = styled.Image`
  position: absolute;
  right: -5%;
  bottom: 0;
  width: 100%;
  height: ${Dimensions.get("window").height * 0.4}px;
`;

const HeroTitle = styled.Text`
  font-family: "${props => props.theme.fontPrimary}";
  font-size: 42px;
  color: ${props => props.theme.colorWhite};
  margin-bottom: auto;
`;

const Tools = styled.View`
  height: 50%;
  justify-content: flex-end;
`;

const SearchBarWrapper = styled.View`
  width: 100%;
  margin-bottom: 20px;
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
  color: ${props => props.theme.colorBg};
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
      } else {
        return props.theme.colorAccent;
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

const MessagesScreen = ({ navigation }) => {
  const identity = useContext(IdentityContext);
  const { messages } = useContext(DataContext);

  const bsRef = useRef();
  const bsAnimNode = useRef(new Animated.Value(1));

  const [searchQuery, setSearchQuery] = useState("");
  const [changesMade, setChangesMade] = useState(false);

  const filterObj = {
    Notice: true,
    Event: true,
    Admin: true
  };
  // if (identity.status === "parent") {
  //   identity.children.length > 1 &&
  //     identity.children.forEach(child => {
  //       filterObj[child.referredName] = true;
  //     });
  // } else {
  //   identity.class.forEach(d => {
  //     filterObj[d] = true;
  //   });
  // }

  const [appliedFilters, setAppliedFilters] = useState(filterObj);
  const [appliedSort, setAppliedSort] = useState("Most Recent First");
  const [pendingFilters, setPendingFilters] = useState(filterObj);
  const [pendingSort, setPendingSort] = useState("Most Recent First");

  // let filterChildrenPresent;
  // let filterClassPresent;

  // if (identity.status === "parent") {
  //   filterClassPresent = false;

  //   if (identity.children.length > 1) {
  //     filterChildrenPresent = true;
  //   } else {
  //     filterChildrenPresent = false;
  //   }
  // } else {
  //   filterChildrenPresent = false;
  //   filterClassPresent = true;
  // }

  const organiseData = data => {
    // let organised = JSON.parse(JSON.stringify(data));
    let organised = data.map(d => d);
    const loweredSearchQuery = searchQuery.toLowerCase();

    if (loweredSearchQuery) {
      organised = organised.filter(d =>
        d.title.toLowerCase().includes(loweredSearchQuery)
      );
    }

    organised = organised.filter(d => {
      let included;

      switch (d.type) {
        case "Notice":
          included = appliedFilters["Notice"] ? true : false;
          break;
        case "Event":
          included = appliedFilters["Event"] ? true : false;
          break;
        case "Admin":
          included = appliedFilters["Admin"] ? true : false;
          break;
        default:
          included = false;
      }

      return included;
    });

    switch (appliedSort) {
      case "Most Recent First":
        organised.sort((a, b) => b.createdDate - a.createdDate);
        break;
      case "Pending Actions First":
        organised
          .sort((a, b) => b.createdDate - a.createdDate)
          .sort((a, b) => {
            if (a.response.type && !b.response.type) {
              return -1;
            } else if (!a.response.type && b.response.type) {
              return 1;
            } else if (a.response.type && b.response.type) {
              if (a.response.responded && !b.response.responded) {
                return 1;
              } else if (!a.response.responded && b.response.responded) {
                return -1;
              } else {
                return 0;
              }
            } else {
              return 0;
            }
          });
        break;
      case "Pending Responses First":
        organised
          .sort((a, b) => b.createdDate - a.createdDate)
          .sort((a, b) => {
            if (a.response.type && !b.response.type) {
              return -1;
            } else if (!a.response.type && b.response.type) {
              return 1;
            } else if (a.response.type && b.response.type) {
              const percentResponseA =
                Math.round(
                  (Object.values(a.response.responded).filter(d => d).length /
                    Object.values(a.response.responded).length) *
                    100
                ) / 100;
              const percentResponseB =
                Math.round(
                  (Object.values(b.response.responded).filter(d => d).length /
                    Object.values(b.response.responded).length) *
                    100
                ) / 100;

              if (percentResponseA === 1 && !(percentResponseB === 1)) {
                return 1;
              } else if (!(percentResponseA === 1) && percentResponseB === 1) {
                return -1;
              } else {
                return percentResponseA - percentResponseB;
              }
            } else {
              return 0;
            }
          });
        break;
      default:
        organised.sort((a, b) => {
          if (a.target.dateType && !b.target.dateType) {
            return -1;
          } else if (!a.target.dateType && b.target.dateType) {
            return 1;
          } else if (a.target.dateType && b.target.dateType) {
            return a.target.date - b.target.date;
          } else {
            return 0;
          }
        });
    }

    return JSON.parse(JSON.stringify(organised));
  };

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
            <ImageTint />
            <HeroContent>
              <HeroTitle>Messages</HeroTitle>
              <Tools>
                <SearchBarWrapper>
                  <SearchBar
                    placeholder="Search"
                    placeholderTextColor="#bfbfbf"
                    onChangeText={text => setSearchQuery(text)}
                    value={searchQuery}
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
                  {identity.status === "teacher" && (
                    <Button style={{ marginLeft: 10 }}>
                      <ButtonLabel>Publish</ButtonLabel>
                    </Button>
                  )}
                </ButtonsRow>
              </Tools>
            </HeroContent>
          </Hero>
          <MasonryGrid
            style={{ paddingRight: 20, paddingBottom: 20, paddingLeft: 20 }}
            cols={2}
            gap={20}
            data={organiseData(messages)}
            childGenFunc={d => (
              <Message
                key={d.title}
                onPress={() => navigation.navigate("MessagesEntry", d)}
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
          <BsContentSectionTitle>Filter by type</BsContentSectionTitle>
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
        {/* {filterChildrenPresent && (
          <BsContentSection>
            <BsContentSectionTitle>Filter by child</BsContentSectionTitle>
            <FiltersRow>
              {identity.children.map(child => {
                const referredName = child.referredName;
                return (
                  <FiltersToggle
                    key={referredName}
                    onPress={() => {
                      const filterObj = { ...pendingFilters };
                      filterObj[referredName] = !pendingFilters[referredName];
                      setPendingFilters(filterObj);
                      setChangesMade(true);
                    }}
                  >
                    <FiltersBadge
                      type="Others"
                      toggled={pendingFilters[referredName]}
                    >
                      {referredName} {pendingFilters[referredName] ? "✓" : "✗"}
                    </FiltersBadge>
                  </FiltersToggle>
                );
              })}
            </FiltersRow>
          </BsContentSection>
        )}
        {filterClassPresent && (
          <BsContentSection>
            <BsContentSectionTitle>Filter by class</BsContentSectionTitle>
            <FiltersRow>
              {identity.class.map(d => {
                return (
                  <FiltersToggle
                    key={d}
                    onPress={() => {
                      const filterObj = { ...pendingFilters };
                      filterObj[d] = !pendingFilters[d];
                      setPendingFilters(filterObj);
                      setChangesMade(true);
                    }}
                  >
                    <FiltersBadge type="Others" toggled={pendingFilters[d]}>
                      {d} {pendingFilters[d] ? "✓" : "✗"}
                    </FiltersBadge>
                  </FiltersToggle>
                );
              })}
            </FiltersRow>
          </BsContentSection>
        )} */}
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
          {identity.status === "parent" ? (
            <SortOption
              onPress={() => {
                setPendingSort("Pending Actions First");
                setChangesMade(true);
              }}
            >
              <SortOptionLabel
                selected={pendingSort === "Pending Actions First"}
              >
                Pending Actions First{" "}
                {pendingSort === "Pending Actions First" ? "✓" : null}
              </SortOptionLabel>
            </SortOption>
          ) : (
            <SortOption
              onPress={() => {
                setPendingSort("Pending Responses First");
                setChangesMade(true);
              }}
            >
              <SortOptionLabel
                selected={pendingSort === "Pending Responses First"}
              >
                Pending Responses First{" "}
                {pendingSort === "Pending Responses First" ? "✓" : null}
              </SortOptionLabel>
            </SortOption>
          )}
          <SortOption
            onPress={() => {
              setPendingSort("Happening Soonest First");
              setChangesMade(true);
            }}
          >
            <SortOptionLabel
              selected={pendingSort === "Happening Soonest First"}
            >
              Happening Soonest First{" "}
              {pendingSort === "Happening Soonest First" ? "✓" : null}
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
