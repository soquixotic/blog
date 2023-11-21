import { Input, Image, Button, Spin } from "antd";
import { useState } from "react";
import { genImage } from "./repo";
import { timeFormat } from "../../utils/format";

export default function AIGen() {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [imageResults, setImageResults] = useState([
    {
      created: 1700559673,
      data: [
        {
          url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-8XOMKH8jJoqyxuBJgLOuyfFr/user-xWXIZvP56ks42siQ0NWKI5pg/img-2Mxm9ubPUT86gi56MpOFBjnp.png?st=2023-11-21T08%3A41%3A13Z&se=2023-11-21T10%3A41%3A13Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-20T13%3A36%3A19Z&ske=2023-11-21T13%3A36%3A19Z&sks=b&skv=2021-08-06&sig=3WTQWMnXi7G6rqWX9MMgkY9v3KCPA3iy/SPQ4DspkvI%3D",
          revised_prompt:
            "A girl with silver hair is standing in a grassy meadow. She is wearing a red dress and holding a black camera in her hands.",
        },
      ],
    },
  ]);

  const onGenImage = () => {
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
    <div className="p-4 space-y-4">
      <div className="text-base font-bold">Prompt:</div>
      <Input.TextArea
        rows={3}
        value={prompt}
        placeholder="Input your prompt here. You have to input 20 characters at least. "
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isLoading}
      />
      <Button
        type="primary"
        loading={isLoading}
        onClick={onGenImage}
        disabled={prompt.length < 20}
      >
        Gen!
      </Button>
      <div className="text-base font-bold">Result:</div>
      {isLoading && <Spin />}
      <div>
        {imageResults.map((item) => {
          const imageInfo = item.data[0];
          const url = imageInfo.url;
          return (
            <div key={url}>
              <div className="font-bold mb-2">{timeFormat(item.created)}</div>
              <div className="mb-2 bg-gray-300 rounded-lg p-2 bg-opacity-75">
                {imageInfo.revised_prompt}
              </div>
              <Image src={url} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
