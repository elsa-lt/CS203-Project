import React, { useState, useEffect } from 'react';
import SingleMatch from '../components/SingleMatch';
import MatchChartLineGenerator from './MatchChartLineGenerator';

const RoundModeller = ({ 
  matchboxHeight,
  currentRoundNumber,
  matches,
  isSelectingWinners,
  completeMatch,
  getMatch,
  tournamentEnded,
  winner }) => {
  const [roundNumber, updateCurrentRoundNumber] = useState(currentRoundNumber);

  useEffect(() => {
    if (tournamentEnded) {
      updateCurrentRoundNumber(prevRoundNumber => prevRoundNumber - 1);
    }
  }, [tournamentEnded]);

  const calculateMatchboxPadding = (roundNumber, matchboxHeight, spacing) => {
    if (roundNumber === 1) {
      return 0;
    }
    const multiplier = Math.pow(2, roundNumber - 1); 
    const padding = ((multiplier * matchboxHeight) + ((multiplier - 1) * spacing) - matchboxHeight) / 2;
  
    return padding;
  };

  const calculateLinePadding = (matchboxHeight, roundNumber, spacing) => {
    if (roundNumber === 1) {
      return matchboxHeight / 2;
    }
    const multiplier = Math.pow(2, roundNumber - 2); 
    const matchboxHeightHalved = matchboxHeight / 2;
    const spacingHalved = spacing / 2;

    const padding = (multiplier * matchboxHeightHalved) + ((multiplier - 1) * spacingHalved);

    return padding;
  };

  const calculateLineHeight = (matchboxHeight, roundNumber, spacing) => {
    if (roundNumber === 1) {
      return 0;
    }

    const firstMultiplier = Math.pow(2, roundNumber - 1); 
    const secondMultiplier = Math.pow(2, roundNumber - 2); 
    const matchboxHeightHalved = matchboxHeight / 2;

    const height = (firstMultiplier * matchboxHeightHalved) + (secondMultiplier * spacing);

    return height;
  };

  const matchBoxPadding = calculateMatchboxPadding(roundNumber, matchboxHeight, 16);
  const connectingLinePadding = calculateLinePadding(matchboxHeight, roundNumber, 16);
  const lines = [];

  if (!tournamentEnded) {
    const numberOfMatches = matches.length;

    const lineHeight = calculateLineHeight(matchboxHeight, roundNumber, 16);
    for (let i = 0; i < numberOfMatches; i++) {
      lines.push(<MatchChartLineGenerator key={i} matchboxHeight={matchboxHeight} padding={connectingLinePadding} lineHeight={lineHeight} tournamentEnded={tournamentEnded}/>);
    } 
  } else {
    lines.push(<MatchChartLineGenerator matchboxHeight={matchboxHeight} padding={connectingLinePadding} tournamentEnded={tournamentEnded}/>)
  }

  return (
    <div className="flex">
  
      <div className="flex flex-col items-center">
        <div className="flex border rounded-full items-center justify-center text-white p-2 w-40">
          <div className="flex mr-2">Round</div>
          <div className="flex">{currentRoundNumber}</div>
        </div>

        <div className="flex">
          {roundNumber != 1 && 
            <div className="flex flex-col text-white space-y-[16px] pt-10">
              {lines}
            </div>
          }

          <div className="flex flex-col text-white space-y-[16px] pt-10">
            {matches.map((match, index) => (
              <SingleMatch 
                key={match.id}
                match={match}  
                matchboxHeight={matchboxHeight}
                padding={matchBoxPadding}
                isSelectingWinners={isSelectingWinners}
                completeMatch={completeMatch}
                getMatch={getMatch}
                tournamentEnded={tournamentEnded}
                winner={winner}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoundModeller;