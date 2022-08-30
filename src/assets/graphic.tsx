import clsx from "clsx";

export const Graphic = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 120 24" className={clsx(className, "fill-current")}>
		<path d="m119.924 14.365-3.965-7.33-.316-.547-.308-.01L104.195 0l-.586.452c-.142.11-.304.24-.486.386-1.481 1.19-4.238 3.403-10.222 5.68l-.61.232-1.032 7.593 13.346 9.075.016.094.336.146.03.02.004-.006.761.328 14.172-9.637v.002Zm-2.88-.702-10.626 7.224-.886-5.546c2.196-.546 6.302-2.179 9.305-5.758l2.207 4.08ZM104.377 2.65l9.005 5.234c-2.679 3.383-6.434 4.773-8.198 5.265l-.593.22-8.893-5.61c4.81-2.058 7.347-4.04 8.681-5.11h-.002ZM94.152 9.387l9.107 5.744.854 5.292-10.491-7.135.53-3.9ZM69.62 2.783c-3.718-2.793-7.479-.918-9.59 1.018-2.108-1.97-5.876-3.891-9.603-1.09a6.657 6.657 0 0 0-1.888 2.207c-2.105 4.005.574 7.138.688 7.268l9.61 9.613c.325.328.757.49 1.188.49.43 0 .856-.162 1.184-.486l9.553-9.485.058-.062c.116-.132 2.797-3.267.684-7.274A6.67 6.67 0 0 0 69.62 2.78v.002ZM69 10.628l-8.974 8.909-8.975-8.975c-.202-.255-1.594-2.133-.348-4.504a4.2 4.2 0 0 1 1.195-1.39c3.573-2.687 7.03 1.502 7.172 1.678l.949 1.185.954-1.179c.144-.178 3.575-4.323 7.178-1.614.5.374.913.854 1.19 1.386 1.255 2.38-.153 4.27-.343 4.504h.001ZM30.195 3.241a.77.77 0 0 0-.735-.668l-.43-.016c-6.1-.216-10.685 1.29-13.646 4.487C8.929 1.95 1.605 2.854 1.279 2.9l-.39.052a.769.769 0 0 0-.662.672l-.046.392c-.633 5.332.398 9.56 3.059 12.565 2.929 3.309 6.996 4.155 8.912 4.371l.005.018.404.022c.35.03.576.034.648.034.51.028 1.01.042 1.5.042 5.114 0 9.073-1.479 11.784-4.404 4.732-5.107 3.8-12.676 3.758-12.996l-.056-.426ZM5.135 14.867C3.28 12.76 2.418 9.823 2.568 6.116a.768.768 0 0 1 .789-.738c2.338.062 6.636.654 10.491 3.711-1.064 1.779-1.61 3.673-1.869 5.376L9.468 11.93a1.276 1.276 0 1 0-1.813 1.799l4.13 4.165c.003.15.01.292.017.428-1.712-.286-4.6-1.106-6.666-3.451l-.002-.004Zm19.484.06c-1.933 2.085-4.728 3.291-8.333 3.537l5.836-5.926a1.276 1.276 0 1 0-1.819-1.793l-5.968 6.063c.06-2.205.578-5.342 2.7-7.791 2.122-2.453 5.467-3.765 9.962-3.913a.77.77 0 0 1 .795.78c-.04 2.29-.54 6.204-3.173 9.043Z" />
	</svg>
);