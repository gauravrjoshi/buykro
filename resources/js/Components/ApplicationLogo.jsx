export default function ApplicationLogo(props) {
    return (
        <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="SW Afflio" className="h-10 w-10 object-contain" {...props} />
            <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">
                SW<span className="text-indigo-500">Afflio</span>
            </span>
        </div>
    );
}
