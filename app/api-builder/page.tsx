"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Code2, 
  Send, 
  Copy, 
  Check, 
  Download,
  Plus,
  Trash2,
  Settings,
  Terminal,
  Globe,
  Key
} from "lucide-react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface Header {
  key: string;
  value: string;
}

export default function ApiBuilderPage() {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState("https://api.example.com/v1/users");
  const [headers, setHeaders] = useState<Header[]>([
    { key: "Content-Type", value: "application/json" },
  ]);
  const [body, setBody] = useState("{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\"\n}");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"headers" | "body" | "response">("headers");

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const updateHeader = (index: number, field: "key" | "value", value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const sendRequest = async () => {
    setLoading(true);
    setResponse(null);

    // Simulate API call
    setTimeout(() => {
      const mockResponse = {
        status: 200,
        statusText: "OK",
        headers: {
          "content-type": "application/json",
        },
        data: {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          createdAt: new Date().toISOString(),
        },
      };

      setResponse(JSON.stringify(mockResponse, null, 2));
      setLoading(false);
      setActiveTab("response");
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportRequest = () => {
    const requestData = {
      method,
      url,
      headers: headers.filter(h => h.key && h.value),
      body: method !== "GET" ? body : undefined,
    };

    const blob = new Blob([JSON.stringify(requestData, null, 2)], {
      type: "application/json",
    });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "api-request.json";
    a.click();
    URL.revokeObjectURL(blobUrl);
  };

  const generateCurl = () => {
    let curl = `curl -X ${method} "${url}"`;
    
    headers.forEach(header => {
      if (header.key && header.value) {
        curl += ` \\\n  -H "${header.key}: ${header.value}"`;
      }
    });

    if (method !== "GET" && body) {
      curl += ` \\\n  -d '${body.replace(/\n/g, "\\n")}'`;
    }

    return curl;
  };

  const methods: HttpMethod[] = ["GET", "POST", "PUT", "DELETE", "PATCH"];
  const methodColors = {
    GET: "bg-green-500",
    POST: "bg-blue-500",
    PUT: "bg-yellow-500",
    DELETE: "bg-red-500",
    PATCH: "bg-purple-500",
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] text-gray-100">
      {/* Top Bar */}
      <div className="bg-[#0f1629] border-b border-[#1a2332] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">API Request Builder</h1>
          </div>
          <Link
            href="/#portfolio"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Retour
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Request Panel */}
          <div className="space-y-6">
            {/* Method & URL */}
            <div className="bg-[#0f1629] rounded-lg border border-[#1a2332] p-6">
              <div className="flex gap-3 mb-4">
                {methods.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`px-4 py-2 rounded font-semibold text-sm transition-all ${
                      method === m
                        ? `${methodColors[m]} text-white shadow-lg`
                        : "bg-[#1a2332] text-gray-400 hover:text-white"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#0a0e27] border border-[#1a2332] rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono text-sm"
                    placeholder="https://api.example.com/endpoint"
                  />
                </div>
                <motion.button
                  onClick={sendRequest}
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {loading ? "Sending..." : "Send"}
                </motion.button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-[#0f1629] rounded-lg border border-[#1a2332]">
              <div className="flex border-b border-[#1a2332]">
                {[
                  { id: "headers", label: "Headers", icon: Settings },
                  { id: "body", label: "Body", icon: Code2 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as "headers" | "body")}
                      className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? "text-blue-400 border-b-2 border-blue-500"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="p-6">
                {activeTab === "headers" && (
                  <div className="space-y-3">
                    {headers.map((header, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          type="text"
                          value={header.key}
                          onChange={(e) => updateHeader(index, "key", e.target.value)}
                          placeholder="Header name"
                          className="flex-1 px-4 py-2 bg-[#0a0e27] border border-[#1a2332] rounded-lg text-white focus:outline-none focus:border-blue-500 font-mono text-sm"
                        />
                        <input
                          type="text"
                          value={header.value}
                          onChange={(e) => updateHeader(index, "value", e.target.value)}
                          placeholder="Header value"
                          className="flex-1 px-4 py-2 bg-[#0a0e27] border border-[#1a2332] rounded-lg text-white focus:outline-none focus:border-blue-500 font-mono text-sm"
                        />
                        <button
                          onClick={() => removeHeader(index)}
                          className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addHeader}
                      className="w-full py-2 border-2 border-dashed border-[#1a2332] rounded-lg text-gray-400 hover:text-white hover:border-blue-500 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Header
                    </button>
                  </div>
                )}

                {activeTab === "body" && (
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    disabled={method === "GET"}
                    className="w-full h-64 px-4 py-3 bg-[#0a0e27] border border-[#1a2332] rounded-lg text-white focus:outline-none focus:border-blue-500 font-mono text-sm resize-none"
                    placeholder={method === "GET" ? "GET requests don't have a body" : "Enter JSON body..."}
                  />
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                onClick={() => copyToClipboard(generateCurl())}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-3 bg-[#1a2332] hover:bg-[#252d3f] rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                Copy cURL
              </motion.button>
              <motion.button
                onClick={exportRequest}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-3 bg-[#1a2332] hover:bg-[#252d3f] rounded-lg text-white font-medium transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Export
              </motion.button>
            </div>
          </div>

          {/* Response Panel */}
          <div className="bg-[#0f1629] rounded-lg border border-[#1a2332] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-white">Response</h3>
              </div>
              {response && (
                <button
                  onClick={() => copyToClipboard(response)}
                  className="px-3 py-1.5 bg-[#1a2332] hover:bg-[#252d3f] rounded text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  Copy
                </button>
              )}
            </div>

            <div className="bg-[#0a0e27] rounded-lg border border-[#1a2332] p-4 min-h-[400px]">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                    />
                    <span className="text-gray-400 text-sm">Sending request...</span>
                  </div>
                </div>
              ) : response ? (
                <pre className="text-green-400 font-mono text-sm overflow-auto">
                  {response}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                  <div className="text-center">
                    <Code2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Response will appear here</p>
                  </div>
                </div>
              )}
            </div>

            {/* Response Info */}
            {response && (
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                  <Check className="w-4 h-4" />
                  <span>Status: 200 OK</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* cURL Preview */}
        <div className="mt-6 bg-[#0f1629] rounded-lg border border-[#1a2332] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <h3 className="font-semibold text-white">cURL Command</h3>
            </div>
            <button
              onClick={() => copyToClipboard(generateCurl())}
              className="px-3 py-1.5 bg-[#1a2332] hover:bg-[#252d3f] rounded text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              Copy
            </button>
          </div>
          <div className="bg-[#0a0e27] rounded-lg border border-[#1a2332] p-4">
            <pre className="text-cyan-400 font-mono text-sm overflow-x-auto">
              {generateCurl()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

