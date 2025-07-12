// src/components/Avatar.tsx

interface AvatarProps {
  name: string;
}

const getInitials = (name: string) => {
  const names = name.split(' ');
  const firstName = names[0] ?? '';
  const lastName = names.length > 1 ? names[names.length - 1] : '';
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export default function Avatar({ name }: AvatarProps) {
  const initials = getInitials(name);

  return (
    <div className="avatar placeholder">
      <div className="bg-purple-600 text-neutral-content rounded-full w-8 ring ring-purple-600 ring-offset-base-100 ring-offset-2">
        <span className="text-sm font-bold">{initials}</span>
      </div>
    </div>
  );
}
