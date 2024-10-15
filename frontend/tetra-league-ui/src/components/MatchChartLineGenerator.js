import React from 'react';

// { matchboxHeight, spacing }
const MatchChartLineGenerator = ({ matchboxHeight, padding, lineHeight }) => {

  return(
    <div 
      style={{ padding: `${padding}px 0` }}
      className="flex">
      {/*currently hardcoded*/}
      <div className=" flex flex-col justify-between">
        {/* top horizontal line*/}
        <hr className="flex h-px w-16 border-0 bg-white"/>
        {/* bottom horizontal line */}
        <hr className="flex h-px w-16 border-0 bg-white"/>
      </div>
      {/* vertical line with dynamic height */}
      <div className="w-px bg-white" style={{ height: `${lineHeight}px` }}></div>
      {/* horizontal line to next round match*/}
      <hr className=" flex h-px w-16 border-0 bg-white" style={{ marginTop: `${lineHeight / 2}px` }}/>
      {/* {padding} */}
    </div>
  );
};

export default MatchChartLineGenerator

/*
margin -> margin + (spacing / 2)
*/