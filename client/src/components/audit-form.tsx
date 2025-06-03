import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuditFormProps {
  onAudit: (url: string) => void;
  isLoading: boolean;
}

export default function AuditForm({ onAudit, isLoading }: AuditFormProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    let validatedUrl = url.trim();
    
    // Add protocol if missing
    if (!validatedUrl.startsWith('http://') && !validatedUrl.startsWith('https://')) {
      validatedUrl = 'https://' + validatedUrl;
    }

    try {
      new URL(validatedUrl);
      onAudit(validatedUrl);
    } catch (error) {
      alert("Please enter a valid URL (e.g., https://example.com)");
    }
  };

  return (
    <div className="glass-strong rounded-3xl p-8 md:p-12 shadow-2xl mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        🔍 Start Your SEO Audit
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center mb-8">
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your website URL (e.g., https://example.com)"
          className="flex-1 px-6 py-4 text-lg bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-primary transition-all duration-300"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="px-8 py-4 gradient-primary text-white font-semibold rounded-xl text-lg btn-hover disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <div className="spinner mr-2"></div>
              Analyzing...
            </>
          ) : (
            <>
              🔍 Start Audit
            </>
          )}
        </Button>
      </form>

      {/* API Endpoints Indicator */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
        {[
          { name: "audit", icon: "📊", path: "/api/audit" },
          { name: "speed", icon: "⚡", path: "/api/speed" },
          { name: "meta", icon: "🏷️", path: "/api/meta" },
          { name: "links", icon: "🔗", path: "/api/links" },
          { name: "robots", icon: "🤖", path: "/api/robots" },
          { name: "headers", icon: "🔒", path: "/api/headers" },
        ].map((endpoint) => (
          <div
            key={endpoint.name}
            className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-center font-medium"
          >
            {endpoint.icon} {endpoint.path}
          </div>
        ))}
      </div>
    </div>
  );
}
