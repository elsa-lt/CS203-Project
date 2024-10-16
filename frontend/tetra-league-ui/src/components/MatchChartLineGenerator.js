import React from 'react';

const MatchChartLineGenerator = ({ matchboxHeight, padding, lineHeight, tournamentEnded}) => {

  return(
    <>
      {!tournamentEnded && (
        <>
        <div 
          style={{ padding: `${padding}px 0` }}
          className="flex">

          <div className=" flex flex-col justify-between">
            <hr className="flex h-px w-16 border-0 bg-white"/>
            <hr className="flex h-px w-16 border-0 bg-white"/>
          </div>
          <div className="w-px bg-white" style={{ height: `${lineHeight}px` }}></div>
            <hr className=" flex h-px w-16 border-0 bg-white" style={{ marginTop: `${lineHeight / 2}px` }}/>
          </div>
        </>
      )}

      {tournamentEnded && (
        <>
          <div
            style={{ paddingTop: `${padding}px`, paddingBottom: '0' }}
            className="flex">
              <hr className="flex h-px w-16 border-0 bg-white"/>
          </div>
        </>
      )}
    </>
  );
};

export default MatchChartLineGenerator