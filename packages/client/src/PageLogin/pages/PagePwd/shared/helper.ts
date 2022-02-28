export function vanillaPost(url: string, payload: FormData) {
  return window.fetch(
    url,
    {
      method: "POST",
      redirect: "follow",
      body: payload
    }
  )
    .then(res => res.json())
    .then((res: any) => {
      if(res.status === "OK") {
        return res;
      }
      throw res;
    });
}
