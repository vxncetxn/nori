import React, { useContext, useRef, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import { format, formatDistanceToNow } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import * as Calendar from "expo-calendar";
import * as Localization from "expo-localization";
import { Platform } from "@unimodules/core";
import { Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { IdentityContext, DataContext } from "../Context";

import WithBsView from "../components/WithBsView";
import Badge from "../components/Badge";
import RegText from "../components/RegText";
import AccentedText from "../components/AccentedText";
import Anchor from "../components/Anchor";
import FormInput from "../components/FormInput";
import FormExpander from "../components/FormExpander";
import FormSelection from "../components/FormSelection";
import FormTextArea from "../components/FormTextArea";
import FormDateTime from "../components/FormDateTime";
import KeyboardToolbar from "../components/KeyboardToolbar";

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

const BsHeader = styled.Text`
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

const MessagesEntryScreen = ({ route, navigation }) => {
  const identity = useContext(IdentityContext);
  const { teachers, parents, children } = useContext(DataContext);

  let {
    createdDate,
    target,
    type,
    title,
    publisher,
    response,
    details
  } = route.params;

  const bsRef = useRef();

  const [bsMode, setBsMode] = useState("Calendar");

  const [calTitleVal, setCalTitleVal] = useState(title);
  const [alertVal, setAlertVal] = useState("");
  const [notesVal, setNotesVal] = useState("");

  const [categoryVal, setCategoryVal] = useState(type);
  const [titleVal, setTitleVal] = useState(title);
  const [resType, setResType] = useState(response.type || null);
  const [resDeadline, setResDeadline] = useState(
    response.type ? new Date(response.deadline) : null
  );
  const [calStartDate, setCalStartDate] = useState(
    target.dateType ? new Date(target.startDate) : null
  );
  const [calEndDate, setCalEndDate] = useState(
    new Date(target.endDate) || null
  );
  const [locationVal, setLocationVal] = useState(target.location || "");
  const [detailsVal, setDetailsVal] = useState(details);

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

      if (response.type === "Acknowledgement") {
        responseButtonStatus = "complete";
        responseButtonLabelString = "Acknowledged";
      } else {
        responseButtonStatus = "complete";
        responseButtonLabelString = "Consent Given";
      }
    } else {
      if (response.type === "Acknowledgement") {
        responseAlertPresent = true;
        responseAlertString = `You have to acknowledge by ${format(
          new Date(response.deadline),
          "do LLLL yyyy"
        )}`;
        responseButtonStatus = "pending";
        responseButtonLabelString = "Acknowledge";
      } else if (response.type === "Consent") {
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
      title: calTitleVal,
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
    <WithBsView
      ref={bsRef}
      bsProps={
        bsMode === "Calendar"
          ? {
              submitLabel: "Add",
              onSubmit: addEventToCalendar
            }
          : { submitLabel: "Publish Edits", onSubmit: () => {} }
      }
      bsChildren={
        bsMode === "Calendar" ? (
          <KeyboardAwareScrollView extraHeight={0}>
            <BsHeader>Add To Calendar</BsHeader>
            <StyledFormInput
              label="Title: "
              multiline
              value={calTitleVal}
              onChangeText={text => setCalTitleVal(text)}
            />
            {target.dateType ? (
              <TargetDateText style={{ marginBottom: 15 }}>
                <AccentedText>
                  {target.dateType === "Occurence" ? "Happening on" : "Due on"}:{" "}
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
          </KeyboardAwareScrollView>
        ) : (
          <>
            <KeyboardAwareScrollView extraHeight={0}>
              <BsHeader>Edit Message</BsHeader>
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
                setBsMode("Calendar");
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
                <ToolButton
                  style={{ marginLeft: 25 }}
                  onPress={() => {
                    setBsMode("Edit");
                    requestAnimationFrame(() => bsRef.current.snapTo(0));
                  }}
                >
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
            <PublisherImage source={{ uri: teachers.get(publisher).picture }} />
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
                {target.dateType === "Occurence" ? "Happening on" : "Due on"}:{" "}
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
            <Anchor
              style={{ marginBottom: 20 }}
              href={
                Platform.OS === "ios"
                  ? `https://maps.apple.com/maps?address=${target.location
                      .split(" ")
                      .join("+")}`
                  : `https://maps.google.com/maps?address=${target.location
                      .split(" ")
                      .join("+")}`
              }
            >
              {target.location}
            </Anchor>
          ) : null}
          <RegText>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
            {"\n"}
            {"\n"}
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and a search for 'lorem ipsum'
            will uncover many web sites still in their infancy. Various versions
            have evolved over the years, sometimes by accident, sometimes on
            purpose (injected humour and the like).
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
                    } else if (!(a[1] === "positive") && b[1] === "positive") {
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
    </WithBsView>
  );
};

export default MessagesEntryScreen;
