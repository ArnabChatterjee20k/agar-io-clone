
import { Trophy } from 'lucide-react';

// Mock leaderboard data
const leaderboardData = [
  { rank: 1, name: "Nebula_X", score: 12843, highlight: true },
  { rank: 2, name: "QuantumPlayer", score: 10567, highlight: false },
  { rank: 3, name: "CosmicGamer", score: 9834, highlight: false },
  { rank: 4, name: "StarDust404", score: 8721, highlight: false },
  { rank: 5, name: "NeonHunter", score: 7654, highlight: false },
];

const LeaderboardPreview = () => {
  return (
    <div className="bg-dark-lighter border border-neon-purple/30 rounded-lg overflow-hidden neon-shadow-purple">
      <div className="bg-neon-purple/20 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="text-neon-purple h-5 w-5" />
          <h3 className="font-bold text-lg text-white">Global Leaderboard</h3>
        </div>
        <span className="text-sm text-gray-400">Top Players</span>
      </div>
      <div className="p-2">
        <table className="w-full">
          <thead className="text-gray-400 text-sm">
            <tr>
              <th className="p-2 text-left">Rank</th>
              <th className="p-2 text-left">Player</th>
              <th className="p-2 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((player) => (
              <tr 
                key={player.rank} 
                className={`
                  ${player.highlight ? 'bg-neon-purple/10' : ''}
                  ${player.rank <= 3 ? 'text-neon-purple/90' : 'text-gray-300'}
                `}
              >
                <td className="p-2">
                  {player.rank === 1 ? (
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-neon-purple/20 text-neon-purple text-xs">
                      {player.rank}
                    </span>
                  ) : (
                    player.rank
                  )}
                </td>
                <td className="p-2 font-medium">{player.name}</td>
                <td className="p-2 text-right font-mono">{player.score.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-neon-purple/10 p-3 text-center">
        <a href="#" className="text-neon-purple hover:underline text-sm">
          View Full Leaderboard
        </a>
      </div>
    </div>
  );
};

export default LeaderboardPreview;
