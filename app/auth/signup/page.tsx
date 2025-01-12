"use client";

import React, {
  Dispatch,
  SetStateAction,
  useState,
  useTransition,
} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Form,
} from "@nextui-org/react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import { signUpAction } from "@/actions/auth-actions";
import { title } from "@/components/primitives";

const SignUp: React.FC = (): React.JSX.Element => {
  const [error, setError]: [
    string | null,
    Dispatch<SetStateAction<string | null>>,
  ] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const valuesEntries = Object.fromEntries(
      new FormData(e.currentTarget as HTMLFormElement),
    );

    const values = {
      fullName: valuesEntries.fullName.toString(),
      email: valuesEntries.email.toString(),
      username: valuesEntries.username.toString(),
      password: valuesEntries.password.toString(),
      verifyPassword: valuesEntries.verifyPassword.toString(),
    };

    setError(null);

    startTransition(async () => {
      const res = await signUpAction(values);

      if (res?.error) setError(res?.error.toString());
      else router.push("/auth/signin?recentlySignedUp=true");
    });
  }

  return (
    <main className="h-dvh w-full flex items-center justify-center">
      <Card className="w-96 p-4">
        <CardHeader
          className={clsx(
            title({
              size: "lg",
              color: "blue",
            }),
            "text-center",
          )}
        >
          Sign Up
        </CardHeader>
        <CardBody>
          <Form onSubmit={onSubmit}>
            <Input
              errorMessage={error}
              label="Full name"
              labelPlacement="outside"
              name="fullName"
            />

            <Input
              errorMessage={error}
              label="Email"
              labelPlacement="outside"
              name="email"
              type="email"
            />

            <Input
              errorMessage={error}
              label="Username"
              labelPlacement="outside"
              name="username"
            />

            <Input
              errorMessage={error}
              label="Password"
              labelPlacement="outside"
              name="password"
              type="password"
            />

            <Input
              errorMessage={error}
              label="Verify Password"
              labelPlacement="outside"
              name="verifyPassword"
              type="password"
            />

            <Button
              className="w-full"
              color="primary"
              isDisabled={isPending}
              type="submit"
            >
              Sign In
            </Button>
          </Form>
        </CardBody>
      </Card>
    </main>
  );
};

export default SignUp;
