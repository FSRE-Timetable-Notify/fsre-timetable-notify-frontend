import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import type { FsreError, HttpResponse, MessagingSubscription } from "@/api/api";

import { client } from "@/api/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleError } from "@/lib/errors";

import ClassCombobox from "./class-combobox";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  studyProgramId: z.number().int(),
});

interface Props {
  selectedTimetableStudyProgramId?: number;
  timetableStudyPrograms: Record<number, string>;
}

const SignUpCard: React.FC<Props> = ({
  selectedTimetableStudyProgramId,
  timetableStudyPrograms,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      studyProgramId: selectedTimetableStudyProgramId ?? -55,
    },
    resolver: zodResolver(formSchema),
  });
  const { isPending, mutateAsync } = useMutation<
    MessagingSubscription,
    HttpResponse<never, FsreError>,
    z.infer<typeof formSchema>
  >({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return (await client.messaging.subscribe(data)).data;
    },
    mutationKey: ["subscribe"],
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
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
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
                    onTimetableStudyProgramSelected={field.onChange}
                    selectedTimetableStudyProgramId={field.value}
                    timetableStudyPrograms={timetableStudyPrograms}
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
