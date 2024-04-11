import { useRef } from "react";
import { styled } from "styled-components";

const GsapScrollHorizontal2Container = styled.article`
  overflow: hidden;

  &#main-scrollbar {
    font-family: "Signika Negative", sans-serif;
    font-weight: 300;
    color: black;
    width: auto;
    height: 100dvh;
    overflow: auto;
    margin: 0;
  }

  h2 {
    padding: 50px 0 0 50px;
    color: white;
    font-size: 3rem;
  }
  section.horizontal {
    overflow: hidden;

    & .pin-wrap,
    & .animation-wrap {
      display: flex;
      position: relative;
      z-index: 1;
      height: 100dvh;
    }

    & .item {
      position: relative;
      padding: 15rem 8rem;
      flex: 0 0 50rem;
      height: calc(100dvh);
      display: flex;
      align-items: center;
      line-height: 1.7;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      border-right: 1px solid rgba(0, 0, 0, 0.06);
      background-color: transparent;

      &:before {
        position: absolute;
        font-size: 10rem;
        opacity: 0.13;
        font-weight: 700;
        z-index: -1;
        transform: translate(-3rem, -5rem);
        -webkit-transform: translate(-3rem, -5rem);
        line-height: 1;
      }
    }

    & .animation-wrap {
      &.to-right {
        counter-reset: item;
        float: left;

        & .item:before {
          counter-increment: item;
          content: counter(item);
        }
      }

      &.to-left {
        counter-reset: item 11;
        float: right;

        & .item:before {
          counter-increment: item -1;
          content: counter(item);
        }
      }

      & .item:nth-child(2n + 2) {
        align-items: flex-start;
      }
      & .item:nth-child(4n + 4) {
        align-items: flex-end;
      }
    }
  }

  section {
    width: 100%;
    height: 100%;
    position: relative;

    &:nth-of-type(odd) {
      background-color: #f0f0f0;
    }
    &:nth-of-type(even) {
      background-color: #ffffff;
    }
  }
`;

const GsapScrollHorizontal2 = () => {
  const bodyRef = useRef<HTMLElement>(null);

  // const smoothScrollbarInit = () => {};

  return (
    <GsapScrollHorizontal2Container id="main-scrollbar" ref={bodyRef}>
      <h2>
        scrollTrigger Horizontal Scrolling - smooth-scrollbar -5 Instances
      </h2>
      <section className="horizontal">
        <div className="pin-wrap" id="pinThis-0">
          <div className="animation-wrap to-right" id="animateThis-0">
            <div className="item">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Necessitatibus, temporibus esse magni illum eos natus ipsum minus?
              Quis excepturi voluptates atque dolorum minus eligendi! Omnis
              minima magni recusandae ex dignissimos.
            </div>
            <div className="item">
              Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa
              ratione ex, dicta aliquam voluptates! Odio vitae eum nobis
              dignissimos sunt ipsum repellendus totam optio distinctio. Laborum
              suscipit quia aperiam.
            </div>
            <div className="item">
              Animi, porro molestias? Reiciendis dolor aspernatur ab quos nulla
              impedit, dolores ullam hic commodi nobis nam. Dolorem expedita
              laudantium dignissimos nobis a. Dolorem, unde quidem. Tempora et a
              quibusdam inventore!
            </div>
            <div className="item">
              Labore, unde amet! Alias delectus hic laboriosam et dolorum?
              Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et
              nostrum, tempore modi quo praesentium aspernatur vero dolor, ipsa
              unde perspiciatis minima.
            </div>
            <div className="item">
              Quaerat error dolorem aspernatur magni dicta ut consequuntur
              maxime tempore. Animi odio eos quod culpa nulla consectetur?
              Aperiam ipsam ducimus delectus reprehenderit unde, non laborum
              voluptate laboriosam, officiis at ea!
            </div>
            <div className="item">
              Rem nobis facere provident magni minima iste commodi aliquam
              harum? Facere error quos cumque perspiciatis voluptatibus deserunt
              maiores, fugiat sunt sit ab inventore natus saepe, eveniet alias
              ipsam placeat voluptas!
            </div>
            <div className="item">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Necessitatibus, temporibus esse magni illum eos natus ipsum minus?
              Quis excepturi voluptates atque dolorum minus eligendi! Omnis
              minima magni recusandae ex dignissimos.
            </div>
            <div className="item">
              Magnam eveniet inventore assumenda ullam. At saepe voluptatibus
              sed dicta reiciendis, excepturi nisi perferendis, accusantium est
              suscipit tempora dolorum praesentium cupiditate doloribus non?
              Sint numquam recusandae dolore quis esse ea?
            </div>
            <div className="item">
              Temporibus cum dolor minima consequatur esse veritatis enim nemo
              cupiditate laborum doloribus reiciendis perferendis, quas fugit
              earum rerum, at beatae alias amet aspernatur dolorem dolore error
              commodi. Perspiciatis, reiciendis amet!
            </div>
            <div className="item">
              Vitae, tenetur beatae error corrupti odit expedita quisquam
              commodi ea aspernatur aliquid, eveniet reprehenderit sequi,
              similique maiores praesentium quam! Optio tenetur saepe unde
              voluptatem minus tempora maxime temporibus ducimus ullam!
            </div>
          </div>
        </div>
      </section>
      <h2>Nothing to see here...</h2>

      <section className="horizontal">
        <div className="pin-wrap" id="pinThis-1">
          <div className="animation-wrap to-left" id="animateThis-1">
            <div className="item">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Necessitatibus, temporibus esse magni illum eos natus ipsum minus?
              Quis excepturi voluptates atque dolorum minus eligendi! Omnis
              minima magni recusandae ex dignissimos.
            </div>
            <div className="item">
              Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa
              ratione ex, dicta aliquam voluptates! Odio vitae eum nobis
              dignissimos sunt ipsum repellendus totam optio distinctio. Laborum
              suscipit quia aperiam.
            </div>
            <div className="item">
              Animi, porro molestias? Reiciendis dolor aspernatur ab quos nulla
              impedit, dolores ullam hic commodi nobis nam. Dolorem expedita
              laudantium dignissimos nobis a. Dolorem, unde quidem. Tempora et a
              quibusdam inventore!
            </div>
            <div className="item">
              Labore, unde amet! Alias delectus hic laboriosam et dolorum?
              Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et
              nostrum, tempore modi quo praesentium aspernatur vero dolor, ipsa
              unde perspiciatis minima.
            </div>
            <div className="item">
              Quaerat error dolorem aspernatur magni dicta ut consequuntur
              maxime tempore. Animi odio eos quod culpa nulla consectetur?
              Aperiam ipsam ducimus delectus reprehenderit unde, non laborum
              voluptate laboriosam, officiis at ea!
            </div>
            <div className="item">
              Rem nobis facere provident magni minima iste commodi aliquam
              harum? Facere error quos cumque perspiciatis voluptatibus deserunt
              maiores, fugiat sunt sit ab inventore natus saepe, eveniet alias
              ipsam placeat voluptas!
            </div>
            <div className="item">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Necessitatibus, temporibus esse magni illum eos natus ipsum minus?
              Quis excepturi voluptates atque dolorum minus eligendi! Omnis
              minima magni recusandae ex dignissimos.
            </div>
            <div className="item">
              Magnam eveniet inventore assumenda ullam. At saepe voluptatibus
              sed dicta reiciendis, excepturi nisi perferendis, accusantium est
              suscipit tempora dolorum praesentium cupiditate doloribus non?
              Sint numquam recusandae dolore quis esse ea?
            </div>
            <div className="item">
              Temporibus cum dolor minima consequatur esse veritatis enim nemo
              cupiditate laborum doloribus reiciendis perferendis, quas fugit
              earum rerum, at beatae alias amet aspernatur dolorem dolore error
              commodi. Perspiciatis, reiciendis amet!
            </div>
            <div className="item">
              Vitae, tenetur beatae error corrupti odit expedita quisquam
              commodi ea aspernatur aliquid, eveniet reprehenderit sequi,
              similique maiores praesentium quam! Optio tenetur saepe unde
              voluptatem minus tempora maxime temporibus ducimus ullam!
            </div>
          </div>
        </div>
      </section>
      <h2>...little laggy, isn't it?</h2>
      <section className="horizontal">
        <div className="pin-wrap" id="pinThis-2">
          <div className="animation-wrap to-right" id="animateThis-2">
            <div className="item">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Necessitatibus, temporibus esse magni illum eos natus ipsum minus?
              Quis excepturi voluptates atque dolorum minus eligendi! Omnis
              minima magni recusandae ex dignissimos.
            </div>
            <div className="item">
              Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa
              ratione ex, dicta aliquam voluptates! Odio vitae eum nobis
              dignissimos sunt ipsum repellendus totam optio distinctio. Laborum
              suscipit quia aperiam.
            </div>
            <div className="item">
              Animi, porro molestias? Reiciendis dolor aspernatur ab quos nulla
              impedit, dolores ullam hic commodi nobis nam. Dolorem expedita
              laudantium dignissimos nobis a. Dolorem, unde quidem. Tempora et a
              quibusdam inventore!
            </div>
            <div className="item">
              Labore, unde amet! Alias delectus hic laboriosam et dolorum?
              Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et
              nostrum, tempore modi quo praesentium aspernatur vero dolor, ipsa
              unde perspiciatis minima.
            </div>
            <div className="item">
              Quaerat error dolorem aspernatur magni dicta ut consequuntur
              maxime tempore. Animi odio eos quod culpa nulla consectetur?
              Aperiam ipsam ducimus delectus reprehenderit unde, non laborum
              voluptate laboriosam, officiis at ea!
            </div>
            <div className="item">
              Rem nobis facere provident magni minima iste commodi aliquam
              harum? Facere error quos cumque perspiciatis voluptatibus deserunt
              maiores, fugiat sunt sit ab inventore natus saepe, eveniet alias
              ipsam placeat voluptas!
            </div>
            <div className="item">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Necessitatibus, temporibus esse magni illum eos natus ipsum minus?
              Quis excepturi voluptates atque dolorum minus eligendi! Omnis
              minima magni recusandae ex dignissimos.
            </div>
            <div className="item">
              Magnam eveniet inventore assumenda ullam. At saepe voluptatibus
              sed dicta reiciendis, excepturi nisi perferendis, accusantium est
              suscipit tempora dolorum praesentium cupiditate doloribus non?
              Sint numquam recusandae dolore quis esse ea?
            </div>
            <div className="item">
              Temporibus cum dolor minima consequatur esse veritatis enim nemo
              cupiditate laborum doloribus reiciendis perferendis, quas fugit
              earum rerum, at beatae alias amet aspernatur dolorem dolore error
              commodi. Perspiciatis, reiciendis amet!
            </div>
            <div className="item">
              Vitae, tenetur beatae error corrupti odit expedita quisquam
              commodi ea aspernatur aliquid, eveniet reprehenderit sequi,
              similique maiores praesentium quam! Optio tenetur saepe unde
              voluptatem minus tempora maxime temporibus ducimus ullam!
            </div>
          </div>
        </div>
      </section>
      <h2>...keep scrollin' scrollin' scrollin' scrollin'...</h2>
      <section className="horizontal">
        <div className="pin-wrap" id="pinThis-3">
          <div className="animation-wrap to-left" id="animateThis-3">
            <div className="item">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Necessitatibus, temporibus esse magni illum eos natus ipsum minus?
              Quis excepturi voluptates atque dolorum minus eligendi! Omnis
              minima magni recusandae ex dignissimos.
            </div>
            <div className="item">
              Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa
              ratione ex, dicta aliquam voluptates! Odio vitae eum nobis
              dignissimos sunt ipsum repellendus totam optio distinctio. Laborum
              suscipit quia aperiam.
            </div>
            <div className="item">
              Animi, porro molestias? Reiciendis dolor aspernatur ab quos nulla
              impedit, dolores ullam hic commodi nobis nam. Dolorem expedita
              laudantium dignissimos nobis a. Dolorem, unde quidem. Tempora et a
              quibusdam inventore!
            </div>
            <div className="item">
              Labore, unde amet! Alias delectus hic laboriosam et dolorum?
              Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et
              nostrum, tempore modi quo praesentium aspernatur vero dolor, ipsa
              unde perspiciatis minima.
            </div>
            <div className="item">
              Quaerat error dolorem aspernatur magni dicta ut consequuntur
              maxime tempore. Animi odio eos quod culpa nulla consectetur?
              Aperiam ipsam ducimus delectus reprehenderit unde, non laborum
              voluptate laboriosam, officiis at ea!
            </div>
            <div className="item">
              Rem nobis facere provident magni minima iste commodi aliquam
              harum? Facere error quos cumque perspiciatis voluptatibus deserunt
              maiores, fugiat sunt sit ab inventore natus saepe, eveniet alias
              ipsam placeat voluptas!
            </div>
            <div className="item">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Necessitatibus, temporibus esse magni illum eos natus ipsum minus?
              Quis excepturi voluptates atque dolorum minus eligendi! Omnis
              minima magni recusandae ex dignissimos.
            </div>
            <div className="item">
              Magnam eveniet inventore assumenda ullam. At saepe voluptatibus
              sed dicta reiciendis, excepturi nisi perferendis, accusantium est
              suscipit tempora dolorum praesentium cupiditate doloribus non?
              Sint numquam recusandae dolore quis esse ea?
            </div>
            <div className="item">
              Temporibus cum dolor minima consequatur esse veritatis enim nemo
              cupiditate laborum doloribus reiciendis perferendis, quas fugit
              earum rerum, at beatae alias amet aspernatur dolorem dolore error
              commodi. Perspiciatis, reiciendis amet!
            </div>
            <div className="item">
              Vitae, tenetur beatae error corrupti odit expedita quisquam
              commodi ea aspernatur aliquid, eveniet reprehenderit sequi,
              similique maiores praesentium quam! Optio tenetur saepe unde
              voluptatem minus tempora maxime temporibus ducimus ullam!
            </div>
          </div>
        </div>
      </section>
      <h2>...lorem ipsum...</h2>
      <section className="horizontal">
        <div className="pin-wrap" id="pinThis-4">
          <div className="animation-wrap to-right" id="animateThis-4">
            <div className="item">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Necessitatibus, temporibus esse magni illum eos natus ipsum minus?
              Quis excepturi voluptates atque dolorum minus eligendi! Omnis
              minima magni recusandae ex dignissimos.
            </div>
            <div className="item">
              Eaque ullam illum nobis deleniti mollitia unde, sed, nemo ipsa
              ratione ex, dicta aliquam voluptates! Odio vitae eum nobis
              dignissimos sunt ipsum repellendus totam optio distinctio. Laborum
              suscipit quia aperiam.
            </div>
            <div className="item">
              Animi, porro molestias? Reiciendis dolor aspernatur ab quos nulla
              impedit, dolores ullam hic commodi nobis nam. Dolorem expedita
              laudantium dignissimos nobis a. Dolorem, unde quidem. Tempora et a
              quibusdam inventore!
            </div>
            <div className="item">
              Labore, unde amet! Alias delectus hic laboriosam et dolorum?
              Saepe, dicta eaque? Veniam eos blanditiis neque. Officia et
              nostrum, tempore modi quo praesentium aspernatur vero dolor, ipsa
              unde perspiciatis minima.
            </div>
            <div className="item">
              Quaerat error dolorem aspernatur magni dicta ut consequuntur
              maxime tempore. Animi odio eos quod culpa nulla consectetur?
              Aperiam ipsam ducimus delectus reprehenderit unde, non laborum
              voluptate laboriosam, officiis at ea!
            </div>
            <div className="item">
              Rem nobis facere provident magni minima iste commodi aliquam
              harum? Facere error quos cumque perspiciatis voluptatibus deserunt
              maiores, fugiat sunt sit ab inventore natus saepe, eveniet alias
              ipsam placeat voluptas!
            </div>
            <div className="item">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Necessitatibus, temporibus esse magni illum eos natus ipsum minus?
              Quis excepturi voluptates atque dolorum minus eligendi! Omnis
              minima magni recusandae ex dignissimos.
            </div>
            <div className="item">
              Magnam eveniet inventore assumenda ullam. At saepe voluptatibus
              sed dicta reiciendis, excepturi nisi perferendis, accusantium est
              suscipit tempora dolorum praesentium cupiditate doloribus non?
              Sint numquam recusandae dolore quis esse ea?
            </div>
            <div className="item">
              Temporibus cum dolor minima consequatur esse veritatis enim nemo
              cupiditate laborum doloribus reiciendis perferendis, quas fugit
              earum rerum, at beatae alias amet aspernatur dolorem dolore error
              commodi. Perspiciatis, reiciendis amet!
            </div>
            <div className="item">
              Vitae, tenetur beatae error corrupti odit expedita quisquam
              commodi ea aspernatur aliquid, eveniet reprehenderit sequi,
              similique maiores praesentium quam! Optio tenetur saepe unde
              voluptatem minus tempora maxime temporibus ducimus ullam!
            </div>
          </div>
        </div>
      </section>
      <h2>...what dou you think?</h2>
    </GsapScrollHorizontal2Container>
  );
};

export default GsapScrollHorizontal2;
