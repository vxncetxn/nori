import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { IdentityContext, DataContext } from "../Context";

import ImageTint from "../components/ImageTint";
import MasonryGrid from "../components/MasonryGrid";
import Message from "../components/Message";
import Badge from "../components/Badge";

import WithBsView from "../components/WithBsView";
import AccentedText from "../components/AccentedText";
import FormInput from "../components/FormInput";
import FormExpander from "../components/FormExpander";
import FormSelection from "../components/FormSelection";
import FormTextArea from "../components/FormTextArea";
import FormDateTime from "../components/FormDateTime";
import KeyboardToolbar from "../components/KeyboardToolbar";

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

const BsHeader = styled.Text`
  color: ${props => props.theme.colorText};
  font-size: 36px;
  font-family: "${props => props.theme.fontPrimary}";
  margin-bottom: 20px;
`;

const MessagesScreen = ({ navigation }) => {
  const identity = useContext(IdentityContext);
  const { messages } = useContext(DataContext);

  const bsRef = useRef();

  const [bsMode, setBsMode] = useState("Organise");

  const [searchQuery, setSearchQuery] = useState("");
  const [changesMade, setChangesMade] = useState(false);

  const filterObj = {
    Notice: true,
    Event: true,
    Admin: true
  };

  const [appliedFilters, setAppliedFilters] = useState(filterObj);
  const [appliedSort, setAppliedSort] = useState("Most Recent First");
  const [pendingFilters, setPendingFilters] = useState(filterObj);
  const [pendingSort, setPendingSort] = useState("Most Recent First");

  const [categoryVal, setCategoryVal] = useState("Notice");
  const [titleVal, setTitleVal] = useState("");
  const [resType, setResType] = useState(null);
  const [resDeadline, setResDeadline] = useState(null);
  const [calStartDate, setCalStartDate] = useState(null);
  const [calEndDate, setCalEndDate] = useState(null);
  const [locationVal, setLocationVal] = useState(null);
  const [detailsVal, setDetailsVal] = useState("");

  const organiseData = data => {
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
    <WithBsView
      ref={bsRef}
      bsProps={
        bsMode === "Organise"
          ? {
              submitLabel: "Apply",
              onSubmit: () => {
                requestAnimationFrame(() => bsRef.current.snapTo(1));
                setAppliedFilters(pendingFilters);
                setAppliedSort(pendingSort);
              }
            }
          : { submitLabel: "Publish", onSubmit: () => {} }
      }
      bsChildren={
        bsMode === "Organise" ? (
          <KeyboardAwareScrollView extraHeight={0}>
            <BsHeader>Organise</BsHeader>
            <AccentedText style={{ marginBottom: 15 }}>
              Filter by category
            </AccentedText>
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
            <AccentedText style={{ marginBottom: 15 }}>Sort</AccentedText>
            <FormSelection
              style={{ marginBottom: 15, marginLeft: 20 }}
              options={
                identity.status === "parent"
                  ? [
                      "Most Recent First",
                      "Pending Actions First",
                      "Happening Soonest First"
                    ]
                  : [
                      "Most Recent First",
                      "Pending Responses First",
                      "Happening Soonest First"
                    ]
              }
              value={pendingSort}
              setValue={selected => setPendingSort(selected)}
            />
          </KeyboardAwareScrollView>
        ) : (
          <>
            <KeyboardAwareScrollView extraHeight={0}>
              <BsHeader>Publish Message</BsHeader>
              <FiltersRow>
                <FiltersToggle onPress={() => setCategoryVal("Notice")}>
                  <FiltersBadge
                    type="Notice"
                    toggled={categoryVal === "Notice"}
                  >
                    Notice
                  </FiltersBadge>
                </FiltersToggle>
                <FiltersToggle onPress={() => setCategoryVal("Event")}>
                  <FiltersBadge type="Event" toggled={categoryVal === "Event"}>
                    Event
                  </FiltersBadge>
                </FiltersToggle>
                <FiltersToggle onPress={() => setCategoryVal("Admin")}>
                  <FiltersBadge type="Admin" toggled={categoryVal === "Admin"}>
                    Admin
                  </FiltersBadge>
                </FiltersToggle>
              </FiltersRow>
              <FormInput
                style={{ marginBottom: 15 }}
                label="Title: "
                multiline
                inputAccessoryViewID="messages-keyboard-toolbar"
                value={titleVal}
                onChangeText={text => setTitleVal(text)}
                placeholder="Required"
              />
              <FormInput
                style={{ marginBottom: 15 }}
                label="Recipients: "
                multiline
                inputAccessoryViewID="messages-keyboard-toolbar"
                value={titleVal}
                onChangeText={text => setTitleVal(text)}
                placeholder="Required"
              />
              <FormExpander
                style={{ marginBottom: 15 }}
                label="Response Details"
                onExpandSideEffect={() =>
                  resType ? null : setResType("Acknowledgement")
                }
              >
                <AccentedText style={{ marginVertical: 15 }}>
                  Response Type:
                </AccentedText>
                <FormSelection
                  style={{ marginBottom: 15, marginLeft: 20 }}
                  options={["Acknowledgement", "Consent"]}
                  value={resType}
                  setValue={selected => setResType(selected)}
                />
                <FormDateTime
                  label="Deadline: "
                  value={resDeadline}
                  onChange={(e, date) => setResDeadline(date)}
                  placeholder="Required"
                />
              </FormExpander>
              <FormExpander
                style={{ marginBottom: 15 }}
                label="Calendar Details"
              >
                <FormDateTime
                  style={{ marginVertical: 15 }}
                  label="Start Date/Time: "
                  value={calStartDate}
                  onChange={(e, date) => setCalStartDate(date)}
                  placeholder="Required"
                />
                <FormDateTime
                  style={{ marginBottom: 15 }}
                  label="End Date/Time: "
                  value={calEndDate}
                  onChange={(e, date) => setCalEndDate(date)}
                  placeholder="Optional"
                />
                <FormInput
                  label="Location: "
                  multiline
                  inputAccessoryViewID="messages-keyboard-toolbar"
                  value={locationVal}
                  onChangeText={text => setLocationVal(text)}
                  placeholder="Optional"
                />
              </FormExpander>
              <FormTextArea
                inputAccessoryViewID="messages-keyboard-toolbar"
                placeholder="Write message details here"
                value={detailsVal}
                onChangeText={text => setDetailsVal(text)}
              />
            </KeyboardAwareScrollView>
            <KeyboardToolbar
              nativeID="messages-keyboard-toolbar"
              functions={["camera", "gallery", "documents"]}
            />
          </>
        )
      }
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
                    setBsMode("Organise");
                    setPendingFilters(appliedFilters);
                    setPendingSort(appliedSort);
                    requestAnimationFrame(() => bsRef.current.snapTo(0));
                  }}
                >
                  <ButtonLabel>Organise</ButtonLabel>
                </Button>
                {identity.status === "teacher" && (
                  <Button
                    style={{ marginLeft: 10 }}
                    onPress={() => {
                      setBsMode("Publish");
                      requestAnimationFrame(() => bsRef.current.snapTo(0));
                    }}
                  >
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
    </WithBsView>
  );
};

export default MessagesScreen;
