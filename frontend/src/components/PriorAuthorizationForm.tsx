import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CalendarIcon,
  ClipboardList,
  Stethoscope,
  CreditCard,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function PriorAuthorizationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    treatmentType: "",
    insurancePlan: "",
    dateOfService: "",
    diagnosisCode: "",
    doctorNotes: "",
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.BACKEND_URL}/api/authorizations`, {
        ...formData,
        patientId: id,
      });
      toast({
        title: "Success",
        description: "Authorization request submitted successfully.",
      });
      navigate(`/patient/${id}`);
    } catch (error) {
      console.error("Error submitting authorization request:", error);
      toast({
        title: "Error",
        description:
          "Failed to submit authorization request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Prior Authorization Request
        </CardTitle>
        <CardDescription>
          Please fill out the form below to submit a prior authorization
          request.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="treatmentType"
              className="flex items-center space-x-2"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Treatment Type</span>
            </Label>
            <Input
              id="treatmentType"
              name="treatmentType"
              value={formData.treatmentType}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="insurancePlan"
              className="flex items-center space-x-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Insurance Plan</span>
            </Label>
            <Input
              id="insurancePlan"
              name="insurancePlan"
              value={formData.insurancePlan}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="dateOfService"
              className="flex items-center space-x-2"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Date of Service</span>
            </Label>
            <Input
              id="dateOfService"
              name="dateOfService"
              type="date"
              value={formData.dateOfService}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="diagnosisCode"
              className="flex items-center space-x-2"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Diagnosis Code</span>
            </Label>
            <Input
              id="diagnosisCode"
              name="diagnosisCode"
              value={formData.diagnosisCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="doctorNotes"
              className="flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Doctor's Notes</span>
            </Label>
            <Textarea
              id="doctorNotes"
              name="doctorNotes"
              value={formData.doctorNotes}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit Request
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
