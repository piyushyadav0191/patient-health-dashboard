import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ClipboardList,
  User,
  Calendar,
  Activity,
  FileText,
} from "lucide-react";

interface Patient {
  _id: string;
  name: string;
  age: number;
  condition: string;
  medicalHistory: string[];
  treatmentPlan: string;
}

interface AuthorizationRequest {
  _id: string;
  treatmentType: string;
  status: "approved" | "denied" | "pending";
  dateOfService: string;
  diagnosisCode: string;
}

export default function PatientDetail() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [authRequests, setAuthRequests] = useState<AuthorizationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

 useEffect(() => {
   const fetchPatientData = async () => {
     try {
       const patientRes = await axios.get(
         `https://patient-health-dashboard.onrender.com/api/patients/${id}`
       );
       setPatient(patientRes.data);

       const authRes = await axios.get(
         `https://patient-health-dashboard.onrender.com/api/authorizations?patientId=${id}`
       );
       setAuthRequests(authRes.data as AuthorizationRequest[]);
     } catch (error) {
       console.error("Error fetching data:", error);
     } finally {
       setLoading(false); // Ensure loading is set to false after fetching
     }
   };
   fetchPatientData();
 }, [id]);


  if (loading) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!patient) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>
            Unable to fetch patient data. Please try again later.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-3xl font-bold flex items-center gap-2">
          <User className="h-6 w-6" />
          {patient.name}
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Age: {patient.age}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Condition
          </h3>
          <Badge variant="secondary">{patient.condition}</Badge>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Medical History
          </h3>
          <ScrollArea className="h-32 rounded-md border p-4">
            <ul className="space-y-2">
              {patient.medicalHistory.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="bg-primary h-2 w-2 rounded-full mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Treatment Plan
          </h3>
          <p className="text-muted-foreground">{patient.treatmentPlan}</p>
        </div>
        <h3 className="text-xl font-bold mt-8 mb-4">Authorization Requests</h3>
        {authRequests?.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {authRequests.map((request) => (
              <li key={request._id} className="py-4">
                <div className="flex justify-between">
                  <div className="text-sm font-medium text-gray-900">
                    {request.treatmentType}
                  </div>
                  <div
                    className={`text-sm ${
                      request.status === "approved"
                        ? "text-green-600"
                        : request.status === "denied"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Date of Service:{" "}
                  {new Date(request.dateOfService).toLocaleDateString()}
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Diagnosis Code: {request.diagnosisCode}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No authorization requests found.</p>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/authorize/${patient._id}`}>
            Request Prior Authorization
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
