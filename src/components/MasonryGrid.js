import React from "react";
import styled from "styled-components";

const MasonryGrid = styled.View`
  flex-direction: row;
`;

const MasonryGridCol = styled.FlatList`
  width: ${props => 100 / props.cols}%;
  padding: ${props => {
    switch (props.idx) {
      case 0:
        return `0 ${props.gap / 2}px 0 0`;
      case props.cols - 1:
        return `0 0 0 ${props.gap / 2}px`;
      default:
        return `0 ${props.gap / 2}px`;
    }
  }};
`;

const MasonryGridComp = ({
  cols,
  gap,
  data,
  renderItem,
  keyExtractor,
  ...others
}) => {
  const splitDataArr = [];
  [...Array(cols).keys()].forEach(_ => splitDataArr.push([]));
  data.forEach((d, idx) => splitDataArr[idx % cols].push(d));

  return (
    <MasonryGrid {...others}>
      {[...Array(cols).keys()].map((_, idx) => {
        return (
          <MasonryGridCol
            cols={cols}
            gap={gap}
            idx={idx}
            scrollEnabled={false}
            data={splitDataArr[idx]}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        );
      })}
    </MasonryGrid>
  );
};

export default MasonryGridComp;
