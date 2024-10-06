import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FsreError, HttpResponse, MessagingSubscription } from "@/api/api";
import { client } from "@/api/client";
import { useMutation } from "@tanstack/react-query";
import ClassCombobox from "./class-combobox";
import { toast } from "sonner";
import { handleError } from "@/lib/errors";

const formSchema = z.object({
  studyProgramId: z.number().int(),
  email: z.string().email("Invalid email address"),
});

type Props = {
  timetableStudyPrograms: Record<number, string>;
};

const SignUpCard: React.FC<Props> = ({ timetableStudyPrograms }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studyProgramId: -55,
      email: "",
    },
  });
  const { isPending, mutateAsync } = useMutation<
    MessagingSubscription,
    HttpResponse<never, FsreError>,
    z.infer<typeof formSchema>
  >({
    mutationKey: ["subscribe"],
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return (await client.messaging.subscribe(data)).data;
    },
    onError: ({ error }) => {
      handleError(error);
    },
    onSuccess: () => {
      toast.dismiss();
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await mutateAsync(data);

    toast.success("You have successfully signed up for event notifications");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="border-border">
          <CardHeader>
            <h2 className="text-xl font-bold">
              Sign up for event notifications
            </h2>
            <p>Get notified when the timetable changes.</p>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-1">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studyProgramId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-1">Class</FormLabel>
                  <ClassCombobox
                    timetableStudyPrograms={timetableStudyPrograms}
                    selectedTimetableStudyProgramId={field.value}
                    onTimetableStudyProgramSelected={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button disabled={isPending}>Sign up</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default SignUpCard;
