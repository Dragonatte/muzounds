"use client";

import React, {
  Dispatch,
  SetStateAction,
  Suspense,
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
  Alert,
} from "@nextui-org/react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { loginAction } from "@/actions/auth-actions";
import { title } from "@/components/primitives";

const AlertToast: React.FC = () => {
  const searchParams = useSearchParams();

  return (
    <>
      {searchParams.get("recentlySignedUp") && (
        <div className={"absolute top-4 enter-exit-animation"}>
          <Alert
            description={"Revisa tu correo para verificar tu cuenta"}
            title={"Te has registrado exitosamente"}
          />
        </div>
      )}
    </>
  );
};

const SignIn: React.FC = () => {
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
      username: valuesEntries.username.toString(),
      password: valuesEntries.password.toString(),
    };

    setError(null);

    startTransition(async () => {
      loginAction(values)
        .then((res) => {
          if (res.error) setError(res.error);
          else {
            setError(null);
            router.push("/dashboard");
          }
        })
        .catch((err) => ({ error: err }));
    });
  }

  return (
    <main className="h-dvh w-full flex items-center justify-center relative">
      <Suspense>
        <AlertToast />
      </Suspense>
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
          Sign In
        </CardHeader>
        <CardBody>
          <Form onSubmit={onSubmit}>
            <Input
              errorMessage={error}
              isInvalid={!!error}
              label="Username"
              labelPlacement="outside"
              name="username"
            />

            <Input
              errorMessage={error}
              isInvalid={!!error}
              label="Password"
              labelPlacement="outside"
              name="password"
              type="password"
            />

            <Button
              className="w-full"
              color="primary"
              disabled={isPending}
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

export default SignIn;
