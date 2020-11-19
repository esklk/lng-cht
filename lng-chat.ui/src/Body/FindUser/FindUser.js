import React, { useEffect, useState } from "react";
import { userService } from "../../Shared/Services/userService";

export default function FindUser() {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const result = await userService
        .getUserAsync()
        .then((user) => {
          return {
            toTeach: user.languagesToLearn.map((lang) => {
              return { code: lang.code, levelMax: 4 };
            }),
            toLearn: user.languagesToTeach.map((lang) => {
              return { code: lang.code, levelMin: 1 };
            }),
          };
        })
        .then((langFilter) =>
          userService.getUsersAsync(
            langFilter.toLearn,
            langFilter.toTeach,
            20,
            0
          )
        );
      setIsLoading(false);
      console.log(result);
    };
    fetchUser();
  }, []);

  return <div>{isLoading ? "Loading ..." : "Hello from FindUser!"}</div>;
}
