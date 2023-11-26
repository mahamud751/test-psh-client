import React from "react";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import "./About.css";
const About = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl md:px-4  lg:px-8 text-gray-900">
        <div className="mx-auto max-w-2xl lg:max-w-none ">
          <div className="my-12">
            <div className="grid grid-cols-12 sm:px-5 md:gap-x-8 gap-y-16">
              <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-12 xl:col-span-6">
                <h1 className="text-5xl font-bold text-gray-900 md:p-5">
                  Your <span className="span_name">Comfortable Page</span>{" "}
                  Retreat Away From Home
                </h1>
              </div>
              <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-12 xl:col-span-6">
                <p>
                  Discover a comfortable retreat at Project Second Home. Our
                  well-furnished rooms are designed with your comfort in mind,
                  providing a peaceful environment where you can relax and
                  recharge. Enjoy amenities such as cozy beds, ample storage,
                  and study areas to create your personal haven. We strive to
                  ensure that every aspect of your stay contributes to a
                  positive experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="https://i.ibb.co/Qf5gQG0/unsplash-Q-Sei-Tq-Slc.png" alt="" />
      <div className="mx-auto max-w-7xl px-4 sm:px-1 lg:px-8 text-gray-900">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-12">
          <div className="my-12">
            <div className="grid grid-cols-12 sm:px-5 md:gap-x-8 gap-y-16">
              <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:col-span-12 xl:col-span-12">
                <div className="text-center">
                  <h4 className="text-2xl">
                    Empowering Women Through Safe Accommodation
                  </h4>
                  <p className="mt-5">
                    At Project Second Home, we believe in empowering women to
                    reach their full potential. Our mission is to provide a safe
                    and secure living space that fosters personal growth and
                    development. We offer various programs and resources to
                    support your educational and career aspirations. From study
                    areas to networking opportunities, we are committed to
                    helping you succeed.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-12">
            <div className="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16">
              <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-12 xl:col-span-3">
                <img
                  src="https://i.ibb.co/Wk9d5Pb/Frame-3741.png"
                  alt=""
                  height={300}
                  width={300}
                />
                <img
                  src="https://i.ibb.co/QnsKxgD/Frame-3743.png"
                  alt=""
                  height={300}
                  width={300}
                />
              </div>
              <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:col-span-12 xl:col-span-9">
                <h1 className="md:text-5xl sm:text-xl font-bold text-gray-900 md:p-5 sm:w-[120px] md:w-[500px]">
                  Join Our Community of
                  <span className="span_name ms-3">Empowered Women</span>
                </h1>
                <p className="sm:p-5 md:p-0">
                  Connect with like-minded individuals and foster lifelong
                  friendships within our vibrant community. Experience the
                  support and encouragement that comes from being part of
                  Project Second Home.
                </p>
                <img
                  src="https://i.ibb.co/D4KjKmv/Frame-3742.png"
                  alt=""
                  className="sm:w-[320px]"
                />
              </div>
            </div>
          </div>
          <div className="my-12">
            <div className="grid grid-cols-12 sm:px-5 md:gap-x-8 gap-y-16">
              <div className="flex flex-col items-start col-span-12 md:space-y-3 sm:col-span-12 xl:col-span-12">
                <div className="text-center">
                  <h4 className="meet text-2xl">MEET WITH OUR BEST TEAM</h4>
                  <p className="mt-5">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry is
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </p>
                </div>
              </div>
            </div>
            <div className="my-12">
              <div className="grid grid-cols-12 sm:px-5 md:gap-x-8 gap-y-16">
                <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-12 xl:col-span-3 ">
                  <Card className="max-w-[24rem] overflow-hidden">
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="m-0 rounded-none"
                    >
                      <img
                        src="https://i.ibb.co/GkDxDJ0/Rectangle-96-1.png
                
                    "
                        alt="ui/ux review check"
                      />
                    </CardHeader>
                    <CardBody className="p-4">
                      <h6 className="text-black font-bold">Jon Smith</h6>

                      <p>Co- Worker</p>
                    </CardBody>
                  </Card>
                </div>
                <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-3 ">
                  <Card className="max-w-[24rem] overflow-hidden">
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="m-0 rounded-none"
                    >
                      <img
                        src="https://i.ibb.co/GkDxDJ0/Rectangle-96-1.png
                
                    "
                        alt="ui/ux review check"
                      />
                    </CardHeader>
                    <CardBody className="p-4">
                      <h6 className="text-black font-bold">Jon Smith</h6>

                      <p>Co- Worker</p>
                    </CardBody>
                  </Card>
                </div>
                <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-3 ">
                  <Card className="max-w-[24rem] overflow-hidden">
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="m-0 rounded-none"
                    >
                      <img
                        src="https://i.ibb.co/GkDxDJ0/Rectangle-96-1.png
                
                    "
                        alt="ui/ux review check"
                      />
                    </CardHeader>
                    <CardBody className="p-4">
                      <h6 className="text-black font-bold">Jon Smith</h6>

                      <p>Co- Worker</p>
                    </CardBody>
                  </Card>
                </div>
                <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-3 ">
                  <Card className="max-w-[24rem] overflow-hidden">
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="m-0 rounded-none"
                    >
                      <img
                        src="https://i.ibb.co/GkDxDJ0/Rectangle-96-1.png
                
                    "
                        alt="ui/ux review check"
                      />
                    </CardHeader>
                    <CardBody className="p-4">
                      <h6 className="text-black font-bold">Jon Smith</h6>

                      <p>Co- Worker</p>
                    </CardBody>
                  </Card>
                </div>
                <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-3 ">
                  <Card className="max-w-[24rem] overflow-hidden">
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="m-0 rounded-none"
                    >
                      <img
                        src="https://i.ibb.co/GkDxDJ0/Rectangle-96-1.png
                
                    "
                        alt="ui/ux review check"
                      />
                    </CardHeader>
                    <CardBody className="p-4">
                      <h6 className="text-black font-bold">Jon Smith</h6>

                      <p>Co- Worker</p>
                    </CardBody>
                  </Card>
                </div>
                <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-3 ">
                  <Card className="max-w-[24rem] overflow-hidden">
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="m-0 rounded-none"
                    >
                      <img
                        src="https://i.ibb.co/GkDxDJ0/Rectangle-96-1.png
                
                    "
                        alt="ui/ux review check"
                      />
                    </CardHeader>
                    <CardBody className="p-4">
                      <h6 className="text-black font-bold">Jon Smith</h6>

                      <p>Co- Worker</p>
                    </CardBody>
                  </Card>
                </div>
                <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-3 ">
                  <Card className="max-w-[24rem] overflow-hidden">
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="m-0 rounded-none"
                    >
                      <img
                        src="https://i.ibb.co/GkDxDJ0/Rectangle-96-1.png
                
                    "
                        alt="ui/ux review check"
                      />
                    </CardHeader>
                    <CardBody className="p-4">
                      <h6 className="text-black font-bold">Jon Smith</h6>

                      <p>Co- Worker</p>
                    </CardBody>
                  </Card>
                </div>
                <div className="flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-3 ">
                  <Card className="max-w-[24rem] overflow-hidden">
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="m-0 rounded-none"
                    >
                      <img
                        src="https://i.ibb.co/GkDxDJ0/Rectangle-96-1.png
                
                    "
                        alt="ui/ux review check"
                      />
                    </CardHeader>
                    <CardBody className="p-4">
                      <h6 className="text-black font-bold">Jon Smith</h6>

                      <p>Co- Worker</p>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
