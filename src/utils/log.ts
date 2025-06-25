export const logGroup = ({ title, data }: { title: string; data: any }) => {
  if (data && Object.keys(data).length) {
    console.group(title);

    console.groupEnd();
  }
};
