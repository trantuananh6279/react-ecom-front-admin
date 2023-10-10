import { PacmanLoader } from 'react-spinners';

export default function Spinner({ fullWidth }) {
    if (fullWidth) {
        return (
            <div className="hidden md:w-full md:flex md:justify-center">
                <PacmanLoader color={'#b8bfbe'} speedMultiplier={1} />
            </div>
        );
    }
    return <PacmanLoader color={'#b8bfbe'} speedMultiplier={1} />;
}
