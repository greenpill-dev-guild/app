"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form, Input } from "antd";

export default function PathPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPath = searchParams.get("selectedPath");

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full h-full p-4 flex flex-col items-center gap-5">
      <div className="flex flex-row items-center justify-between w-full h-14 font-bold text-2xl">
        <p
          className="bg-gradient-to-r from-white to-transparent rounded-l-3xl py-1 px-2"
          onClick={() => router.back()}
        >
          &lt;-
        </p>
        <p>{selectedPath ? selectedPath : ""}</p>
        <p className="px-6"></p>
      </div>
      <div className="w-full">
        <h1 className="font-semibold text-xl mb-1">Complete your Profile</h1>
        <p className="text-xs font-light">This step is optional!</p>
      </div>
      <div className="w-full rounded-3xl bg-white flex flex-col gap-5 px-4 py-6">
        <Form
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="w-full"
          size="large"
        >
          <Form.Item
            label="Given Name"
            name="givenname"
            rules={[
              {
                required: true,
                message: "Please input your given name!",
              },
            ]}
          >
            <Input placeholder="Enter Given name" />
          </Form.Item>{" "}
          <Form.Item
            label="Family Name"
            name="familyname"
            rules={[
              {
                required: true,
                message: "Please input your family name!",
              },
            ]}
          >
            <Input placeholder="Enter Family name" />
          </Form.Item>{" "}
          <Form.Item
            label="City/State/Country"
            name="country"
            rules={[
              {
                required: true,
                message: "Please input your city/state/country!",
              },
            ]}
          >
            <Input placeholder="Enter your city/state/country" />
          </Form.Item>{" "}
          <Form.Item
            label="Local Government"
            name="lga"
            rules={[
              {
                required: true,
                message: "Please input your Local Government!",
              },
            ]}
          >
            <Input placeholder="Enter your Local Government" />
          </Form.Item>{" "}
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your Phone Number!",
              },
            ]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>{" "}
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email Address!",
              },
            ]}
          >
            <Input placeholder="Enter your email address" />
          </Form.Item>
          <Form.Item>
            <Button
              className="bg-[#38C793] w-full "
              size="large"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              className="border-2 border-[#38C793] w-full text-[#38c793]"
              size="large"
              type="default"
              htmlType="button"
              onClick={() => router.push("/home")}
            >
              Skip this step
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="w-full flex flex-col items-center pb-4">
        <p className="text-center w-5/6 text-xs font-light">
          Your information will not be shared with the public and will only be
          used for identification purposes and to contact you if necessary.
        </p>
      </div>
      <p className="pb-4 font-extralight text-xs">
        powered by <b>impact stream</b>
      </p>
    </div>
  );
}
