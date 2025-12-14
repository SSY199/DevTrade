import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {sendOtp, verifyOtp} from "../api/auth.api.js";

export default function VerificationPage() {
  const [email, setEmail] = useState("");
  const [stateId, setStateId] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  // --- Send OTP Mutation ---
  const sendOtpMutation = useMutation({
    mutationFn: async () => {
      const res = await sendOtp({ email });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("OTP sent successfully");
      setStateId(data.data.state_id);
      setStep(2);
    },
    onError: () => toast.error("Failed to send OTP"),
  });

  // --- Verify OTP Mutation ---
  const verifyOtpMutation = useMutation({
  mutationFn: async () => {
    const res = await verifyOtp({
      state_id: stateId,
      otp,
    });
    return res.data;
  },
  onSuccess: (data) => {
    toast.success("OTP verified!");

    navigate("/signup", {
      state: {
        email: data.email,
        tempToken: data.tempToken,
      },
    });
  },
  onError: () => toast.error("OTP verification failed"),
});

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900 px-4">
      <Card className="w-full max-w-md bg-gray-950 border-gray-800 text-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold tracking-wide">
            {step === 1 ? "Verify Your Email" : "Enter OTP"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <Input
                placeholder="Enter your email"
                className="bg-gray-900 border-gray-700 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!email || sendOtpMutation.isPending}
                onClick={() => sendOtpMutation.mutate()}
              >
                {sendOtpMutation.isPending ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Send OTP"
                )}
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Input
                placeholder="Enter OTP"
                className="bg-gray-900 border-gray-700 text-white"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!otp || verifyOtpMutation.isPending}
                onClick={() => verifyOtpMutation.mutate()}
              >
                {verifyOtpMutation.isPending ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Verify OTP"
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full border-gray-700 text-gray-300"
                onClick={() => setStep(1)}
              >
                Change Email
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
