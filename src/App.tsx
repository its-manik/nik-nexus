import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryProvider } from "./providers/QueryProvider";
import ErrorBoundaryProvider from "./providers/ErrorBoundaryProvider";
import Dashboard from "./pages/Dashboard";
import Blocks from "./pages/Blocks";
import BlockDetails from "./pages/BlockDetails";
import Challenges from "./pages/Challenges";
import ChallengeDetails from "./pages/ChallengeDetails";
import Algorithms from "./pages/Algorithms";
import AlgorithmDetails from "./pages/AlgorithmDetails";
import AlgorithmCode from "./pages/AlgorithmCode";
import Config from "./pages/Config";
import Accounts from "./pages/Accounts";
import AccountDetails from "./pages/AccountDetails";
import Benchmarks from "./pages/Benchmarks";
import BenchmarkDetails from "./pages/BenchmarkDetails";
import Proofs from "./pages/Proofs";
import ProofDetails from "./pages/ProofDetails";
import Leaderboard from "./pages/Leaderboard";
import { DarkModeProvider } from './context/DarkModeContext';

function App() {
  return (
    <DarkModeProvider>
      <ErrorBoundaryProvider>
        <QueryProvider>
          <Router>
            <div className="min-h-screen bg-background-light dark:bg-background-darker">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/blocks" element={<Blocks />} />
                <Route path="/block/:blockId" element={<BlockDetails />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route
                  path="/challenge/:challengeId"
                  element={<ChallengeDetails />}
                />
                <Route path="/algorithms" element={<Algorithms />} />
                <Route
                  path="/algorithm/:algorithmId"
                  element={<AlgorithmDetails />}
                />
                <Route
                  path="/algorithm/:algorithmId/code"
                  element={<AlgorithmCode />}
                />
                <Route path="/benchmarks" element={<Benchmarks />} />
                <Route
                  path="/benchmark/:benchmarkId"
                  element={<BenchmarkDetails />}
                />
                <Route path="/proofs" element={<Proofs />} />
                <Route path="/proof/:proofId" element={<ProofDetails />} />
                <Route path="/config" element={<Config />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route
                  path="/account/:accountId"
                  element={<AccountDetails />}
                />
                <Route path="/leaderboard" element={<Leaderboard />} />
              </Routes>
            </div>
          </Router>
        </QueryProvider>
      </ErrorBoundaryProvider>
    </DarkModeProvider>
  );
}

export default App;
