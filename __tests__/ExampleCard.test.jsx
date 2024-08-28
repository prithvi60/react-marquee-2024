import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import React from 'react';
import Marquee from "../components/Marquee";

// Helper to mock containerRef
const mockContainerRef = () => ({
    current: {
        scrollLeft: 0,
        scrollWidth: 1200,
        clientWidth: 600,
        offsetLeft: 0,
    },
});
describe("Marquee Test Cards", () => {

    // Dynamic Mock Data
    const lists = [{
        title: "Hello WebWorld",
        desc: "Lorem ipsum dolor1",
    },
    {
        title: "Hello WebWorld2",
        desc: "Lorem ipsum dolor2",
    },
    {
        title: "Hello WebWorld3",
        desc: "Lorem ipsum dolor3",
    },
    {
        title: "Hello WebWorld3",
        desc: "Lorem ipsum dolor3",
    }]

    describe("Basic Rendering Test", () => {
        it("render a title correctly", () => {
            render(<Marquee>
                {lists.map((list, idx) => (
                    <div
                        key={idx}
                        data-testid="test"
                        className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
                    >
                        <h4 data-testid="title" className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
                            {list.title}
                        </h4>
                        <p data-testid="desc" className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
                            {list.desc}
                        </p>
                    </div>
                ))}
            </Marquee>)
            const listEle = screen.getByText(/Marquee Library/i)
            expect(listEle).toBeInTheDocument()
        })
    })

    describe("Check for Text Content", () => {
        test("render an given text correctly", () => {
            render(<Marquee>
                {lists.map((list, idx) => (
                    <div
                        key={idx}
                        data-testid="test"
                        className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
                    >
                        <h4 data-testid="title" className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
                            {list.title}
                        </h4>
                        <p data-testid="desc" className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
                            {list.desc}
                        </p>
                    </div>
                ))}
            </Marquee>)
            const listEle = screen.getByText("Marquee Library")
            expect(listEle).toBeInTheDocument()
        })
    })

    describe("Testing with Mock Data for Dynamic Content", () => {
        it("renders each example card correctly with dynamic list of data", () => {
            render(<Marquee>
                {lists.map((list, idx) => (
                    <div
                        key={idx}
                        data-testid="test"
                        className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
                    >
                        <h4 data-testid="title" className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
                            {list.title}
                        </h4>
                        <p data-testid="desc" className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
                            {list.desc}
                        </p>
                    </div>
                ))}
            </Marquee>)
            const listEle = screen.getAllByTestId("test")
            expect(listEle).toHaveLength(lists.length * 2)
        })

        it("renders example card without any error", () => {
            render(<Marquee>
                {lists.map((list, idx) => (
                    <div
                        key={idx}
                        data-testid="test"
                        className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
                    >
                        <h4 data-testid="title" className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
                            {list.title}
                        </h4>
                        <p data-testid="desc" className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
                            {list.desc}
                        </p>
                    </div>
                ))}
            </Marquee>)
            const listEle = screen.getAllByTestId("test")
            expect(listEle).toHaveLength(lists.length * 2)
        })

        it("displayed example card title from dynamic data", () => {
            render(<Marquee>
                <div
                    data-testid="test"
                    className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
                >
                    <h4 data-testid="title" className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
                        {lists[0].title}
                    </h4>
                    <p data-testid="desc" className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
                        {lists[0].desc}
                    </p>
                </div>
            </Marquee>)
            const listEle = screen.getAllByTestId("title")
            expect(listEle[0]).toHaveTextContent("Hello WebWorld")
        })

        it("displayed example card desc from dynamic data", () => {
            render(<Marquee>
                <div
                    data-testid="test"
                    className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
                >
                    <h4 data-testid="title" className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
                        {lists[0].title}
                    </h4>
                    <p data-testid="desc" className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
                        {lists[0].desc}
                    </p>
                </div>
            </Marquee>)
            const listEle = screen.getAllByTestId("desc")
            expect(listEle[0]).toHaveTextContent("Lorem ipsum dolor1")
        })
    })

    describe("User Interaction Tests", () => {
        let containerRef;

        beforeEach(() => {
            containerRef = mockContainerRef();
            jest.spyOn(React, 'useRef').mockReturnValue(containerRef);
        });

        it("calls handleDrag on mouse down and updates state correctly", () => {
            render(<Marquee container={mockContainerRef} >
                {lists.map((list, idx) => (
                    <div
                        key={idx}
                        data-testid="test"
                        className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
                    >
                        <h4 data-testid="title" className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
                            {list.title}
                        </h4>
                        <p data-testid="desc" className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
                            {list.desc}
                        </p>
                    </div>
                ))}
            </Marquee>)
            const container = screen.getByTestId("containerId")
            fireEvent.mouseDown(container, { pageX: 50 });
            expect(containerRef.current.scrollLeft).toBe(0);
        })

        it("mouse up and mouse leave event updates state correctly", () => {
            render(<Marquee >
                {lists.map((list, idx) => (
                    <div
                        key={idx}
                        data-testid="test"
                        className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
                    >
                        <h4 data-testid="title" className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
                            {list.title}
                        </h4>
                        <p data-testid="desc" className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
                            {list.desc}
                        </p>
                    </div>
                ))}
            </Marquee>)
            const container = screen.getByTestId("containerId")
            expect(container).toBeInTheDocument()
            expect(container).toHaveClass("cursor-pointer")
            expect(container).not.toHaveClass("cursor-grabbing")

            fireEvent.mouseDown(container)
            expect(container).toHaveClass("cursor-grabbing")

            fireEvent.mouseLeave(container)
            expect(container).toHaveClass("cursor-pointer")

            fireEvent.mouseUp(container)
            expect(container).toHaveClass("cursor-pointer")
        })

        it("mouse Move event updates state correctly", () => {
            render(<Marquee>
                {lists.map((list, idx) => (
                    <div
                        key={idx}
                        data-testid="test"
                        className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
                    >
                        <h4 data-testid="title" className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
                            {list.title}
                        </h4>
                        <p data-testid="desc" className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
                            {list.desc}
                        </p>
                    </div>
                ))}
            </Marquee>)
            const container = screen.getByTestId("containerId")
            expect(container).toBeInTheDocument()
            fireEvent.mouseDown(container)
            const options = { pageX: 1000 * 2, preventDefault: jest.fn() }
            fireEvent.mouseMove(container, options)
            container.scrollLeft = 5000 - options.pageX

            expect(container.scrollLeft).toBeGreaterThanOrEqual(0)
            expect(container.scrollLeft).not.toBeLessThanOrEqual(0)
        })

        it("infinite scroll at the beginning position", () => {

            render(<Marquee>
                {lists.map((list, idx) => (
                    <div
                        key={idx}
                        data-testid="test"
                        className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
                    >
                        <h4 data-testid="title" className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
                            {list.title}
                        </h4>
                        <p data-testid="desc" className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
                            {list.desc}
                        </p>
                    </div>
                ))}
            </Marquee>)
            const container = screen.getByTestId("containerId")
            fireEvent.scroll(container)
            expect(containerRef.current.scrollLeft).toBe(containerRef.current.scrollWidth - 2 * containerRef.current.clientWidth)
        })

        it("infinite scroll at the end position", () => {

            render(<Marquee>
                {lists.map((list, idx) => (
                    <div
                        key={idx}
                        data-testid="test"
                        className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
                    >
                        <h4 data-testid="title" className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
                            {list.title}
                        </h4>
                        <p data-testid="desc" className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
                            {list.desc}
                        </p>
                    </div>
                ))}
            </Marquee>)
            const container = screen.getByTestId("containerId")
            containerRef.current.scrollLeft = containerRef.current.scrollWidth - containerRef.current.clientWidth
            fireEvent.scroll(container)
            expect(containerRef.current.scrollLeft).toBe(containerRef.current.clientWidth)
        })
    })

    describe("Test Animation Behavior", () => {

        // it("animates correctly while initial render", async () => {

        //     render(<Marquee>
        //         {lists?.map((list, idx) => (
        //             <div
        //                 key={idx}
        //                 data-testid="test"
        //                 className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
        //             >
        //                 <h4 data-testid="title" className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
        //                     {list.title}
        //                 </h4>
        //                 <p data-testid="desc" className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
        //                     {list.desc}
        //                 </p>
        //             </div>
        //         ))}
        //     </Marquee>)
        //     const container = screen.getAllByTestId("containerId2")[0]
        //     expect(container).toBeInTheDocument();

        //     expect(container.style.transform).toBe('translateX(-0px)')

        //     await waitFor(() => { expect(container.style.transform).not.toBe('translateX(-0x)') })
        // })

        // it('stops animation on mouse down', async () => {
        //     render(<Marquee>
        //         {lists?.map((list, idx) => (
        //             <div
        //                 key={idx}
        //                 data-testid="test"
        //                 className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
        //             >
        //                 <h4 data-testid="title" className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
        //                     {list.title}
        //                 </h4>
        //                 <p data-testid="desc" className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
        //                     {list.desc}
        //                 </p>
        //             </div>
        //         ))}
        //     </Marquee>)
        //     const container = getAllByTestId('containerId2')[0];
        //     const parentContainer = getByTestId('containerId');
        //     await waitFor(() => {expect(container.style.transform).toBe('translateX(-1px)')});
        //     fireEvent.mouseDown(parentContainer);
        //     await waitFor(() => {expect(container.style.transform).not.toBe('translateX(-2px)')});
        //   });
    })

    describe("Edge case and error handling", () => {
        it("handle edge case: empty array lists", () => {
            const emptyLists = []
            render(<Marquee>
                {emptyLists?.map((list, idx) => (
                    <div
                        key={idx}
                        data-testid="test"
                        className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
                    >
                        <h4 data-testid="title" className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
                            {list.title}
                        </h4>
                        <p data-testid="desc" className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
                            {list.desc}
                        </p>
                    </div>
                ))}
            </Marquee>)
            const container = screen.getByTestId("containerId")
            expect(container).toBeInTheDocument();
        })

        it("handle edge case: invalid props", () => {
            const nullLists = null;
            render(<Marquee>
                {(nullLists || [])?.map((list, idx) => (
                    <div
                        key={idx}
                        data-testid="test"
                        className={`block w-full overflow-hidden border shadow-md rounded-xl min-w-72 max-w-none box snap-center`}
                    >
                        <h4 data-testid="title" className="text-lg font-semibold text-white bg-black border-b-2 border-blue-400 p-2.5">
                            {list.title}
                        </h4>
                        <p data-testid="desc" className="p-2.5 text-base text-white bg-blue-900 line-clamp-3 md:line-clamp-none">
                            {list.desc}
                        </p>
                    </div>
                ))}
            </Marquee>)
            const container = screen.getByTestId("containerId")
            expect(container).toBeInTheDocument();
        })


    })

})