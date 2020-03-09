import React from "react";
import styled from "styled-components";

const MasonryGrid = styled.View`
  flex-direction: row;
`;

const MasonryGridCol = styled.View`
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

const MasonryGridComp = ({ cols, gap, data, childGenFunc, ...others }) => {
  const splitDataArr = [];
  [...Array(cols).keys()].forEach(_ => splitDataArr.push([]));
  data.forEach((d, idx) => splitDataArr[idx % cols].push(d));

  return (
    <MasonryGrid {...others}>
      {[...Array(cols).keys()].map((_, idx) => {
        return (
          <MasonryGridCol key={idx} cols={cols} gap={gap} idx={idx}>
            {splitDataArr[idx].map(d => childGenFunc(d))}
          </MasonryGridCol>
        );
      })}
    </MasonryGrid>
  );
};

export default MasonryGridComp;
