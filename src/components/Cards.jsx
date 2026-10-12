export default function GlassCard({ children, className = "" }) {
    return (
        <div className={`rounded-3xl border border-[#2a2a33] bg-[#14141e]/70 p-6 backdrop-blur-xl md:p-8 ${className}`}>
            {children}
        </div>
    );
}