type Props = {
  info: string;
};

export default function ThisIsInfo({ info }: Props) {
  return (
    <div>
      <p>{info}</p>
    </div>
  );
}
