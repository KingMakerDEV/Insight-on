export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-xs font-bold text-primary-foreground">GL</span>
              </div>
              <span className="text-lg font-bold text-foreground">GovLens</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Open Government Data Intelligence Platform. Transforming public datasets into actionable insights.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Upload Datasets</li>
              <li>Automated Analytics</li>
              <li>AI Insights</li>
              <li>Executive Dashboards</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">About</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Documentation</li>
              <li>System Architecture</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} GovLens. Built for transparent governance.
        </div>
      </div>
    </footer>
  );
}
