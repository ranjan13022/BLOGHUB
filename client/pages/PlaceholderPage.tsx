import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Construction, MessageCircle } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  backLink?: string;
  backLinkText?: string;
}

export default function PlaceholderPage({
  title,
  description,
  backLink = "/",
  backLinkText = "Back to home",
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Construction className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-muted-foreground leading-relaxed">{description}</p>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center mb-3">
              <MessageCircle className="h-5 w-5 text-primary mr-2" />
              <span className="font-medium text-foreground">
                Want this page implemented?
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Continue prompting in the chat to have this page built with the
              content and functionality you need.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={backLink}>
              <Button variant="outline" className="w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {backLinkText}
              </Button>
            </Link>
            <Button className="w-full sm:w-auto">Request Implementation</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
