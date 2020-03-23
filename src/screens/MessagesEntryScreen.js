import React, { useContext, useRef, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components";
import { SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import { format, formatDistanceToNow } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import * as Calendar from "expo-calendar";
import * as Localization from "expo-localization";
import { Platform } from "@unimodules/core";
import Animated from "react-native-reanimated";
import { Keyboard } from "react-native";

import { IdentityContext, DataContext } from "../Context";

import Badge from "../components/Badge";
import RegText from "../components/RegText";
import AccentedText from "../components/AccentedText";
import FormBottomSheet from "../components/FormBottomSheet";
import FormInput from "../components/FormInput";
import FormExpander from "../components/FormExpander";
import FormSelection from "../components/FormSelection";
import FormTextArea from "../components/FormTextArea";

const ScreenWrapper = styled.View`
  flex: 1;
  background-color: #000000;
`;

const Overlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const MessagesEntry = styled.ScrollView`
  background-color: ${props => props.theme.colorBg};
  height: auto;
`;

const Hero = styled.View`
  background-color: ${props => props.theme.colorAccent};
  border-bottom-right-radius: 50px;
  padding: 35px 20px 20px 20px;
  overflow: hidden;
`;

const ImageTint = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const ToolsRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 100px;
`;

const ToolButton = styled.TouchableOpacity``;

const MessageBadgeRow = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const MessageTypeBadge = styled(Badge)`
  background-color: ${props => {
    switch (props.type) {
      case "Notice":
        return "#0080ff";
      case "Event":
        return "#ff00ff";
      case "Admin":
        return "#8000ff";
      default:
        return props.theme.colorInactiveGrey;
    }
  }};
`;

const HeroTitle = styled.Text`
  font-family: "${props => props.theme.fontPrimary}";
  font-size: 36px;
  color: ${props => props.theme.colorWhite};
  margin-bottom: 20px;
`;

const OtherInfoRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const PublisherImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const OtherInfoContent = styled.View`
  justify-content: space-between;
  align-self: stretch;
`;

const PublisherText = styled.Text`
  font-family: "${props => props.theme.fontSecondary}";
  font-size: 18px;
  color: ${props => props.theme.colorWhite};
  margin-left: 20px
`;

const DateText = styled.Text`
  font-family: "${props => props.theme.fontSecondary}";
  font-size: 18px;
  color: ${props => props.theme.colorWhite};
  margin-left: 20px
`;

const MainContent = styled.View`
  padding: 40px 20px;
`;

const TargetDateText = styled.Text`
  margin-bottom: 20px;
`;

const LocationText = styled.Text`
  margin-bottom: 20px;
`;

const ResponseButton = styled.TouchableOpacity`
  margin: 0 auto;
  padding: 10px 50px;
  border-radius: 8px;
  background-color: ${props => {
    switch (props.responseButtonStatus) {
      case "pending":
        return props.theme.colorAccent;
      case "complete":
        return props.theme.colorGreen;
      case "inactive":
        return props.theme.colorInactiveGrey;
      default:
        return props.theme.colorInactiveGrey;
    }
  }};
`;

const ResponseButtonLabel = styled.Text`
  font-family: "${props => props.theme.fontPrimary}";
  font-size: 24px;
  color: ${props => props.theme.colorBg};
`;

const ResponseList = styled.View``;

const ResponseListItem = styled.View`
  margin-bottom: 15px;
  opacity: ${props => (props.status ? "1" : "0.3")};
`;

const ParentsRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const ChildrenRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 15px;
  padding-left: 40px;
  padding-vertical: 5px;
`;

const ResponseListImage = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 35px;
  margin-right: 10px;
`;

const TempText = styled.Text`
  font-family: "${props => props.theme.fontSecondary}";
  font-size: 18px;
  color: ${props => {
    switch (props.status) {
      case "positive":
        return props.theme.colorGreen;
      case "negative":
        return props.theme.colorRed;
      default:
        return "#808080";
    }
  }};
`;

const Thread = styled.View`
  position: absolute;
  top: ${props => (props.first ? "-20%" : "-70%")};
  bottom: 50%;
  width: 30px;
  border-left-color: #808080;
  border-left-width: 2px;
  border-bottom-color: #808080;
  border-bottom-width: 2px;
  border-bottom-left-radius: 8px;
`;

const BsContentSectionTitle = styled.Text`
  color: ${props => props.theme.colorText};
  font-size: 36px;
  font-family: "${props => props.theme.fontPrimary}";
  margin-bottom: 20px;
`;

const StyledFormInput = styled(FormInput)`
  margin-bottom: 15px;
`;

const StyledFormSelection = styled(FormSelection)`
  margin-top: 20px;
`;

const MessagesEntryScreen = ({ route, navigation }) => {
  const identity = useContext(IdentityContext);
  const { teachers, parents, children } = useContext(DataContext);

  let { createdDate, target, type, title, publisher, response } = route.params;

  const bsRef = useRef();
  const bsAnimNode = useRef(new Animated.Value(1));

  const [titleVal, setTitleVal] = useState("");
  const [alertVal, setAlertVal] = useState("");
  const [notesVal, setNotesVal] = useState("");

  useEffect(() => {
    setTitleVal(title);
  }, [title]);

  let responseAlertPresent;
  let responseAlertString;
  let responseButtonPresent;
  let responseButtonStatus;
  let responseButtonLabelString;
  let responseListPresent;
  if (identity.status === "parent") {
    responseListPresent = false;
    responseButtonPresent = true;

    if (response.responded) {
      responseAlertPresent = false;
      responseAlertString = "";

      if (response.type === "acknowledgement") {
        responseButtonStatus = "complete";
        responseButtonLabelString = "Acknowledged";
      } else {
        responseButtonStatus = "complete";
        responseButtonLabelString = "Consent Given";
      }
    } else {
      if (response.type === "acknowledgement") {
        responseAlertPresent = true;
        responseAlertString = `You have to acknowledge by ${format(
          new Date(response.deadline),
          "do LLLL yyyy"
        )}`;
        responseButtonStatus = "pending";
        responseButtonLabelString = "Acknowledge";
      } else if (response.type === "consent") {
        responseAlertPresent = true;
        responseAlertString = `You have to give consent by ${format(
          new Date(response.deadline),
          "do LLLL yyyy"
        )}`;
        responseButtonStatus = "pending";
        responseButtonLabelString = "Give Consent";
      } else {
        responseAlertPresent = false;
        responseAlertString = "";
        responseButtonStatus = "inactive";
        responseButtonLabelString = "No Response Required";
      }
    }
  } else {
    responseButtonPresent = false;
    responseButtonStatus = "";
    responseButtonLabelString = "";

    if (response.type) {
      responseAlertPresent = false;
      responseAlertString = "";
      responseListPresent = true;
    } else {
      responseAlertPresent = false;
      responseAlertString = "";
      responseListPresent = false;
    }
  }

  const theme = useContext(ThemeContext);

  const addEventToCalendar = async () => {
    let calendarID;
    if (Platform.OS === "ios") {
      const defaultCalendar = await Calendar.getDefaultCalendarAsync();
      calendarID = defaultCalendar.id;
    } else {
      const calendars = await Calendar.getCalendarsAsync();
      calendarID = calendars.find(cal => cal.isPrimary).id;
    }

    await Calendar.createEventAsync(calendarID, {
      title: titleVal,
      startDate: new Date(target.startDate),
      endDate: target.endDate
        ? new Date(target.endDate)
        : new Date(target.startDate),
      allDay: !target.endDate,
      location: target.location,
      notes: notesVal,
      alarms:
        alertVal === "At time of event"
          ? [{ relativeOffset: 0 }]
          : alertVal === "30 minutes before"
          ? [{ relativeOffset: -30 }]
          : alertVal === "1 hour before"
          ? [{ relativeOffset: -60 }]
          : alertVal === "2 hours before"
          ? [{ relativeOffset: -120 }]
          : alertVal === "1 day before"
          ? [{ relativeOffset: -1440 }]
          : alertVal === "2 days before"
          ? [{ relativeOffset: -2880 }]
          : [],
      timeZone: Localization.timezone
    });

    Keyboard.dismiss();
    requestAnimationFrame(() => bsRef.current.snapTo(1));
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
        <MessagesEntry>
          <Hero>
            <ImageTint
              colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 1)"]}
            ></ImageTint>
            <ToolsRow>
              <ToolButton
                onPress={() => navigation.navigate("Messages")}
                style={{ marginRight: "auto" }}
              >
                <SimpleLineIcons
                  name="arrow-left"
                  size={25}
                  color={theme.colorWhite}
                />
              </ToolButton>
              <ToolButton
                onPress={async () => {
                  const {
                    status
                  } = await Calendar.requestCalendarPermissionsAsync();

                  if (status === "granted") {
                    requestAnimationFrame(() => bsRef.current.snapTo(0));
                  }
                }}
              >
                <SimpleLineIcons
                  name="calendar"
                  size={25}
                  color={theme.colorWhite}
                />
              </ToolButton>
              {identity.status === "teacher" && (
                <>
                  <ToolButton style={{ marginLeft: 25 }}>
                    <SimpleLineIcons
                      name="note"
                      size={25}
                      color={theme.colorWhite}
                    />
                  </ToolButton>
                  <ToolButton style={{ marginLeft: 20 }}>
                    <SimpleLineIcons
                      name="trash"
                      size={25}
                      color={theme.colorWhite}
                    />
                  </ToolButton>
                </>
              )}
            </ToolsRow>
            <MessageBadgeRow>
              <MessageTypeBadge type={type}>{type}</MessageTypeBadge>
            </MessageBadgeRow>
            <HeroTitle>{title}</HeroTitle>
            <OtherInfoRow>
              <PublisherImage
                source={{ uri: teachers.get(publisher).picture }}
              />
              <OtherInfoContent>
                <PublisherText>
                  {teachers.get(publisher).referredName}
                </PublisherText>
                <DateText>
                  Posted {formatDistanceToNow(new Date(createdDate))} ago
                </DateText>
              </OtherInfoContent>
            </OtherInfoRow>
          </Hero>
          <MainContent>
            {responseAlertPresent ? (
              <AccentedText style={{ marginBottom: 40 }}>
                <FontAwesome
                  name="exclamation"
                  size={15}
                  color={theme.colorAccent}
                />{" "}
                {responseAlertString}
              </AccentedText>
            ) : null}
            {target.dateType ? (
              <TargetDateText>
                <AccentedText>
                  {target.dateType === "occurence" ? "Happening on" : "Due on"}:{" "}
                </AccentedText>
                <RegText>
                  {format(new Date(target.startDate), "do LLLL yyyy, K:mma")}
                  {target.endDate
                    ? ` to ${format(
                        new Date(target.endDate),
                        "do LLLL yyyy, K:mma"
                      )}`
                    : null}
                </RegText>
              </TargetDateText>
            ) : null}
            {target.location ? (
              <LocationText>
                <AccentedText>Location: </AccentedText>
                <RegText>{target.location}</RegText>
              </LocationText>
            ) : null}
            <RegText>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
              {"\n"}
              {"\n"}
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a search for 'lorem
              ipsum' will uncover many web sites still in their infancy. Various
              versions have evolved over the years, sometimes by accident,
              sometimes on purpose (injected humour and the like).
            </RegText>
            {responseButtonPresent ? (
              <ResponseButton
                style={{ marginTop: 60 }}
                disabled={response.type ? false : true}
                responseButtonStatus={responseButtonStatus}
              >
                <ResponseButtonLabel>
                  {responseButtonLabelString}
                </ResponseButtonLabel>
              </ResponseButton>
            ) : null}
            {responseListPresent &&
              (() => {
                const responseArr = Object.entries(response.responded).sort(
                  (a, b) => {
                    if (a[1] && !b[1]) {
                      return -1;
                    } else if (!a[1] && b[1]) {
                      return 1;
                    } else if (a[1] && b[1]) {
                      if (a[1] === "positive" && !(b[1] === "positive")) {
                        return -1;
                      } else if (
                        !(a[1] === "positive") &&
                        b[1] === "positive"
                      ) {
                        return 1;
                      } else {
                        return 0;
                      }
                    } else {
                      return 0;
                    }
                  }
                );

                return (
                  <>
                    <AccentedText style={{ marginVertical: 20 }}>
                      Response {responseArr.filter(d => d[1]).length}/
                      {responseArr.length}:{" "}
                    </AccentedText>
                    <ResponseList>
                      {responseArr.map(d => {
                        const parentsArr = parents.get(d[0]).parents;
                        const childrenArr = parents
                          .get(d[0])
                          .children.map(id => children.get(id));

                        return (
                          <ResponseListItem key={d[0]} status={d[1]}>
                            <ParentsRow>
                              <ResponseListImage
                                source={{ uri: parentsArr[0].picture }}
                              />
                              {parentsArr.length > 1 && (
                                <ResponseListImage
                                  source={{ uri: parentsArr[1].picture }}
                                />
                              )}
                              <RegText>{parentsArr[0].referredName}</RegText>
                              <RegText>
                                {parentsArr.length > 1 &&
                                  ` and ${parentsArr[1].referredName}`}
                              </RegText>
                              <TempText status={d[1]}>
                                {" "}
                                {d[1] === "positive"
                                  ? "✓"
                                  : d[1] === "negative"
                                  ? "✗"
                                  : null}
                              </TempText>
                            </ParentsRow>
                            {childrenArr.map((child, idx) => {
                              return (
                                <ChildrenRow key={child.name}>
                                  <Thread first={idx === 0} />
                                  <ResponseListImage
                                    source={require("../../assets/images/child-profile-stock.jpg")}
                                  />
                                  <RegText>{child.referredName}</RegText>
                                </ChildrenRow>
                              );
                            })}
                          </ResponseListItem>
                        );
                      })}
                    </ResponseList>
                  </>
                );
              })()}
          </MainContent>
        </MessagesEntry>
      </Overlay>
      <FormBottomSheet
        onCancel={() => requestAnimationFrame(() => bsRef.current.snapTo(1))}
        submitLabel="Add"
        onSubmit={addEventToCalendar}
        ref={bsRef}
        snapPoints={["90%", "0%"]}
        initialSnap={1}
        callbackNode={bsAnimNode.current}
      >
        <BsContentSectionTitle>Add To Calendar</BsContentSectionTitle>
        <StyledFormInput
          label="Title: "
          multiline
          value={titleVal}
          onChangeText={text => setTitleVal(text)}
        />
        {target.dateType ? (
          <TargetDateText style={{ marginBottom: 15 }}>
            <AccentedText>
              {target.dateType === "occurence" ? "Happening on" : "Due on"}:{" "}
            </AccentedText>
            <RegText>
              {format(new Date(target.startDate), "do LLLL yyyy, K:mma")}
              {target.endDate
                ? ` to ${format(
                    new Date(target.endDate),
                    "do LLLL yyyy, K:mma"
                  )}`
                : null}
            </RegText>
          </TargetDateText>
        ) : null}
        {target.location ? (
          <LocationText style={{ marginBottom: 15 }}>
            <AccentedText>Location: </AccentedText>
            <RegText>{target.location}</RegText>
          </LocationText>
        ) : null}
        <FormExpander
          style={{ marginBottom: 15 }}
          label="Alert"
          onExpandSideEffect={() => setAlertVal("At time of event")}
        >
          <StyledFormSelection
            options={[
              "At time of event",
              "30 minutes before",
              "1 hour before",
              "2 hours before",
              "1 day before",
              "2 days before"
            ]}
            value={alertVal}
            setValue={selected => setAlertVal(selected)}
          />
        </FormExpander>
        <FormTextArea
          placeholder="Write notes for calendar entry here"
          value={notesVal}
          onChangeText={text => setNotesVal(text)}
        />
      </FormBottomSheet>
    </ScreenWrapper>
  );
};

export default MessagesEntryScreen;
