import { Route, Switch } from "wouter";
import Home from "@/pages/home";
import PlanYourTrip from "@/pages/plan-your-trip";
import { TripReviewBar } from "@/components/TripReviewBar";

export default function App() {
  return (
    <div className="min-h-screen bg-ivory selection:bg-gold/30 selection:text-emerald-900">
      {/* Static, site-wide announcement bar for the personalized-services page.
          Sits above everything, including the existing launch countdown bar.
          The existing funnel (Home) is unchanged — it simply moved into a route. */}
      <TripReviewBar />

      <Switch>
        <Route path="/planyourtripwithus" component={PlanYourTrip} />
        <Route component={Home} />
      </Switch>
    </div>
  );
}
