'use client';

import axios from 'axios';
import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from '@/app/components/modals/Modal';
import Heading from '@/app/components/Heading';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';

function RegisterModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then(() => {
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to inHome" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button
        outline
        label="Continue with Google"
        onClick={() => signIn('google')}
        icon={FcGoogle}
      />
      <Button
        outline
        label="Continue with GitHub"
        onClick={() => signIn('github')}
        icon={AiFillGithub}
      />
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      title="Register"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
      body={bodyContent}
      footer={footerContent}
      actionLabel="Continue"
    />
  );
}

export default RegisterModal;
