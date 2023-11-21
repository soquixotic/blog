import { Input, Image, Button, Spin } from "antd";
import { useState } from "react";
import { genImage } from "./repo";
import { timeFormat } from "../../utils/format";
import { useLoginModalSwitch, useUserData } from "../../utils/user";

export default function AIGen() {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [openLoginModal] = useLoginModalSwitch();
  const userData = useUserData();
  const [imageResults, setImageResults] = useState([]);

  const onGenImage = () => {
    if (!userData.token) {
      openLoginModal();
      return;
    }
    setIsLoading(true);
    genImage(prompt)
      .then((resp) => {
        if (resp.code === 0) {
          setImageResults([resp.data, ...imageResults]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      <div className="font-bold text-red-500 p-2 bg-red-50 bg-opacity-80 rounded-lg">
        Careful!!! <br />
        Once you refresh the page, you're unable to find back the images. Make
        sure save the images you like before you leave.
      </div>
      <div className="text-base font-bold">Prompt:</div>
      <Input.TextArea
        rows={3}
        value={prompt}
        placeholder="Input your prompt here. You have to input 10 characters at least. "
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isLoading}
      />
      <Button
        type="primary"
        loading={isLoading}
        onClick={onGenImage}
        disabled={prompt.length < 10}
      >
        Gen!
      </Button>
      <div className="text-base font-bold">Result:</div>
      <div className="flex space-x-2">
        {isLoading && (
          <div className="w-28 h-28 flex items-center justify-center bg-white bg-opacity-70 rounded-lg">
            <Spin />
          </div>
        )}
        {imageResults.map((item) => {
          const imageInfo = item.data[0];
          const url = imageInfo.url;
          return (
            <div className="w-28 h-28 rounded-lg" key={url}>
              <Image src={url} />
            </div>
          );
        })}
      </div>

      <div>
        {imageResults.map((item) => {
          const imageInfo = item.data[0];
          const url = imageInfo.url;
          return (
            <div key={url} className="bg-white bg-opacity-90 rounded-lg p-4">
              <div className="font-bold mb-2">{timeFormat(item.created)}</div>
              <div className="mb-2 bg-gray-300 rounded-lg p-2 bg-opacity-50">
                {imageInfo.revised_prompt}
              </div>
              <img
                src={url}
                alt={imageInfo.revised_prompt}
                className="w-full h-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
