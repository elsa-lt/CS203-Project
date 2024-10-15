import React from 'react';
import SingleMatch from '../components/SingleMatch';
import MatchChartLineGenerator from './MatchChartLineGenerator';

const RoundModeller = ({ matchboxHeight, currentRoundNumber, matches, isSelectingWinners }) => {

  const numberOfMatches = matches.length;

  //calculates padding required to position matchboxes correctly
  const calculateMatchboxPadding = (currentRoundNumber, matchboxHeight, spacing) => {
    // Round 1 should have no padding
    if (currentRoundNumber === 1) {
      return 0;
    }
    const multiplier = Math.pow(2, currentRoundNumber - 1); // 2^(n-1)
    const padding = ((multiplier * matchboxHeight) + ((multiplier - 1) * spacing) - matchboxHeight) / 2;
  
    return padding;
  };

  const calculateLinePadding = (matchboxHeight, currentRoundNumber, spacing) => {
    if (currentRoundNumber === 1) {
      return matchboxHeight / 2;
    }
    const multiplier = Math.pow(2, currentRoundNumber - 2); // 2^(n-2)
    const matchboxHeightHalved = matchboxHeight / 2;
    const spacingHalved = spacing / 2;

    const padding = (multiplier * matchboxHeightHalved) + ((multiplier - 1) * spacingHalved);

    return padding;
  };

  const calculateLineHeight = (matchboxHeight, currentRoundNumber, spacing) => {
    if (currentRoundNumber === 1) {
      return 0;
    }
    const firstMultiplier = Math.pow(2, currentRoundNumber - 1); // 2^(n-1)
    const secondMultiplier = Math.pow(2, currentRoundNumber - 2); // 2^(n-1)
    const matchboxHeightHalved = matchboxHeight / 2;

    const height = (firstMultiplier * matchboxHeightHalved) + (secondMultiplier * spacing);

    return height;
  };

  //create matchboxes
  const matchBoxPadding = calculateMatchboxPadding(currentRoundNumber, matchboxHeight, 16);

  //create connecting lines
  const lines = [];
  const connectingLinePadding = calculateLinePadding(matchboxHeight, currentRoundNumber, 16);
  const lineHeight = calculateLineHeight(matchboxHeight, currentRoundNumber, 16);
  for (let i = 0; i < numberOfMatches; i++) {
    lines.push(<MatchChartLineGenerator key={i} matchboxHeight={matchboxHeight} padding={connectingLinePadding} lineHeight={lineHeight}/>);
  }

  return (
    <div className="flex">
  
      <div className="flex flex-col items-center">
        <div className="flex border rounded-full items-center justify-center text-white p-2 w-40">
          Round
          {currentRoundNumber}
        </div>

        <div className="flex">
          {currentRoundNumber != 1 && 
            <div className="flex flex-col text-white space-y-[16px] pt-10">
              {lines}
            </div>
          }

          <div className="flex flex-col text-white space-y-[16px] pt-10">
            {matches.map((match, index) => (
              <SingleMatch 
                key={match.id}
                match={match}   // Pass the entire match object if needed
                matchboxHeight={matchboxHeight}
                padding={matchBoxPadding}
                isSelectingWinners={isSelectingWinners}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoundModeller;