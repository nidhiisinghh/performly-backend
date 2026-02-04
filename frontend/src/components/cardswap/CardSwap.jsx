import React, {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    useEffect,
    useMemo,
    useRef
} from 'react'
import gsap from 'gsap'

/* ---------------- Card ---------------- */

export const Card = forwardRef(({ className = '', ...props }, ref) => (
    <div
        ref={ref}
        {...props}
        className={`absolute top-1/2 left-1/2 rounded-xl border border-black bg-white text-black p-6
      [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden]
      ${className}`.trim()}
    />
))

Card.displayName = 'Card'

/* ---------------- Helpers ---------------- */

const makeSlot = (i, dx, dy, total) => ({
    x: i * dx,
    y: -i * dy,
    z: -i * dx * 1.5,
    zIndex: total - i
})

const placeNow = (el, slot, skew) => {
    gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skew,
        transformOrigin: 'center center',
        zIndex: slot.zIndex,
        force3D: true
    })
}

/* ---------------- CardSwap ---------------- */

const CardSwap = ({
    width = 500,
    height = 400,
    cardDistance = 100,
    verticalDistance = 110,
    skewAmount = 0,
    easing = 'elastic',
    children
}) => {
    const config =
        easing === 'elastic'
            ? {
                ease: 'elastic.out(0.6,0.9)',
                durDrop: 2,
                durMove: 2,
                durReturn: 2,
                promoteOverlap: 0.9,
                returnDelay: 0.05
            }
            : {
                ease: 'power1.inOut',
                durDrop: 0.8,
                durMove: 0.8,
                durReturn: 0.8,
                promoteOverlap: 0.45,
                returnDelay: 0.2
            }

    const childArr = useMemo(() => Children.toArray(children), [children])
    const refs = useMemo(() => childArr.map(() => React.createRef()), [childArr.length])
    const order = useRef(childArr.map((_, i) => i))

    const tlRef = useRef(null)
    const isAnimating = useRef(false)

    // Initial Placement
    useEffect(() => {
        const total = refs.length
        refs.forEach((r, i) =>
            placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount)
        )
    }, [cardDistance, verticalDistance, skewAmount, refs])

    const swap = () => {
        if (order.current.length < 2) return
        if (isAnimating.current) return // Prevent rapid clicks messing up animation state (optional, but good for stability)

        // isAnimating.current = true; // Uncomment if you want to block clicks during animation

        const [front, ...rest] = order.current
        const elFront = refs[front].current
        const tl = gsap.timeline({
            onComplete: () => {
                order.current = [...rest, front]
                isAnimating.current = false
                // Re-verify z-indexes just in case? Usually logic handles it.
            }
        })
        tlRef.current = tl

        // 1. Drop Front Card
        tl.to(elFront, {
            y: '+=500',
            rotation: Math.random() * 20 - 10, // Add slight rotation for Flair
            duration: config.durDrop,
            ease: config.ease
        })

        tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`)

        // 2. Move others forward
        restIdxsLabel:
        rest.forEach((idx, i) => {
            const el = refs[idx].current
            const slot = makeSlot(i, cardDistance, verticalDistance, refs.length)
            tl.set(el, { zIndex: slot.zIndex }, 'promote')
            tl.to(
                el,
                { ...slot, duration: config.durMove, ease: config.ease },
                `promote+=${i * 0.15}`
            )
        })

        // 3. Return Front Card to back
        const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length)
        tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`)

        tl.set(elFront, { zIndex: backSlot.zIndex }, 'return')
        tl.to(elFront, {
            ...backSlot,
            rotation: 0,
            duration: config.durReturn,
            ease: config.ease
        }, 'return')
    }

    const rendered = childArr.map((child, i) =>
        isValidElement(child)
            ? cloneElement(child, {
                key: i,
                ref: refs[i],
                style: { width, height, ...(child.props.style || {}) }
            })
            : child
    )

    return (
        <div
            onClick={swap}
            style={{
                width,
                height,
                position: 'relative',
                perspective: '900px',
                overflow: 'visible',
                cursor: 'pointer'
            }}
            title="Click to swap cards"
        >
            {rendered}
        </div>
    )
}

export default CardSwap
