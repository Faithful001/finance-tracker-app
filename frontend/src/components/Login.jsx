'use client';

import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

const Login = () => {
  return (
    <div className="login w-[30rem] h-screen pb-5 px-[10px] bg-white">
      <div className="section p-10">
        <form className="flex max-w-md flex-col gap-4">
            <h1 className='flex justify-center font-bold text-[30px] text-g'>Login</h1>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name1" value="Your name" />
            </div>
            <TextInput id="name" placeholder="John Doe" required type="text" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password"
                value="Your password"
                placeholder="*****"
              />
            </div>
            <TextInput id="password" required type="password" />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
