
export default {
    name: 'ripple',
    bind (el, binding) {
        el.addEventListener('click', (event) => {
            rippler(event, el, binding.value);
        });

        let bg = binding.value || 'rgba(0, 0, 0, 0.35)';

        function rippler(event, el) {
            let target = el;

            // Get necessary variables
            let rect        = target.getBoundingClientRect(),
                left        = rect.left,
                top         = rect.top,
                width       = target.offsetWidth,
                height      = target.offsetHeight,
                dx          = event.clientX - left,
                dy          = event.clientY - top,
                maxX        = Math.max(dx, width - dx),
                maxY        = Math.max(dy, height - dy),
                style       = window.getComputedStyle(target),
                radius      = Math.sqrt((maxX * maxX) + (maxY * maxY));

            // Create the ripple and its container
            let ripple = document.createElement("div"),
                rippleContainer = document.createElement("div");

            //Styles for ripple
            ripple.style.marginTop= '0px';
            ripple.style.marginLeft= '0px';
            ripple.style.width= '1px';
            ripple.style.height= '1px';
            ripple.style.transition= 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            ripple.style.borderRadius= '50%';
            ripple.style.pointerEvents= 'none';
            ripple.style.position= 'relative';
            ripple.style.zIndex= '9999';
            ripple.style.backgroundColor  = bg;
            
            //Styles for rippleContainer
            rippleContainer.style.position= 'absolute';
            rippleContainer.style.left = '0';
            rippleContainer.style.top = '0';
            rippleContainer.style.height = '0';
            rippleContainer.style.width = '0';
            rippleContainer.style.pointerEvents = 'none';
            rippleContainer.style.overflow = 'hidden';
            
            rippleContainer.appendChild(ripple);
            document.body.appendChild(rippleContainer);

            ripple.style.marginLeft   = dx + "px";
            ripple.style.marginTop    = dy + "px";

            rippleContainer.style.left    = left + (((window.pageXOffset || document.scrollLeft) - (document.clientLeft || 0)) || 0) + "px";
            rippleContainer.style.top     = top + (((window.pageYOffset || document.scrollTop) - (document.clientTop || 0)) || 0) + "px";
            rippleContainer.style.width   = width + "px";
            rippleContainer.style.height  = height + "px";
            rippleContainer.style.borderTopLeftRadius  = style.borderTopLeftRadius;
            rippleContainer.style.borderTopRightRadius  = style.borderTopRightRadius;
            rippleContainer.style.borderBottomLeftRadius  = style.borderBottomLeftRadius;
            rippleContainer.style.borderBottomRightRadius  = style.borderBottomRightRadius;

            setTimeout(function() {

                ripple.style.width  = radius * 2 + "px";
                ripple.style.height = radius * 2 + "px";
                ripple.style.marginLeft   = dx - radius + "px";
                ripple.style.marginTop    = dy - radius + "px";
            }, 0);

            setTimeout(function() {
                ripple.style.backgroundColor = "rgba(0, 0, 0, 0)";
            }, 250);

            setTimeout(function() {
                ripple.remove();
                rippleContainer.remove();
            }, 650);
        }
    }
}