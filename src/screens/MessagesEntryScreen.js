import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { SimpleLineIcons, FontAwesome } from "@expo/vector-icons";
import { format, formatDistanceToNow } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";

import { IdentityContext, DataContext } from "../Context";

import Badge from "../components/Badge";
import RegText from "../components/RegText";
import AccentedText from "../components/AccentedText";

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

const ToolButtonCalendar = styled(ToolButton)`
  transform: translateY(-1px);
`;

const MessageBadgeRow = styled.ScrollView`
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
        break;
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

const MessagesEntryScreen = ({ route, navigation }) => {
  const identity = useContext(IdentityContext);
  const { teachers, parents, children } = useContext(DataContext);

  let { createdDate, target, type, title, publisher, response } = route.params;

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
      } else if (response.type === "consent") {
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

  return (
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
          <ToolButton style={{ marginRight: 20 }}>
            <SimpleLineIcons
              name="question"
              size={25}
              color={theme.colorWhite}
            />
          </ToolButton>
          <ToolButtonCalendar>
            <SimpleLineIcons
              name="calendar"
              size={25}
              color={theme.colorWhite}
            />
          </ToolButtonCalendar>
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
              {target.dateType === "occurence" ? "Happening on" : "Due on"}:{" "}
            </AccentedText>
            <RegText>{format(new Date(target.date), "do LLLL yyyy")}</RegText>
          </TargetDateText>
        ) : null}
        {target.location ? (
          <LocationText>
            <AccentedText>Location: </AccentedText>
            <RegText>{target.location}</RegText>
          </LocationText>
        ) : null}
        <RegText>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
          {"\n"}
          {"\n"}
          Many desktop publishing packages and web page editors now use Lorem
          Ipsum as their default model text, and a search for 'lorem ipsum' will
          uncover many web sites still in their infancy. Various versions have
          evolved over the years, sometimes by accident, sometimes on purpose
          (injected humour and the like).
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
            const responseArr = Object.entries(response.responded);

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
                      <ResponseListItem key={d[0]}>
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
                          <TempText status={"positive"}>
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
        {/* {responseListPresent && (
          <>
            <AccentedText style={{ marginVertical: 20 }}>
              Response 13/{Object.entries(response.responded).length}:{" "}
            </AccentedText>
            <ResponseList>
              {Object.entries(response.responded).map(d => {
                const parentsArr = parents.get(d[0]).parents;
                const childrenArr = parents
                  .get(d[0])
                  .children.map(id => children.get(id));

                return (
                  <ResponseListItem key={d[0]}>
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
                      <TempText status={"positive"}>
                        {" "}
                        {d[1] === "" ? "✓" : d[1] === "negative" ? "✗" : null}
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
        )} */}
      </MainContent>
    </MessagesEntry>
  );
};

export default MessagesEntryScreen;
