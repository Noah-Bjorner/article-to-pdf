export const mockContent = `
<div class="content">
            <figure>
                <img src="https://cdn.theatlantic.com/thumbor/EhSxoLiMa4HNw_Lj6_YFwwl9tBY=/0x0:2000x1124/1440x810/filters:still()/media/cinemagraph/2025/04/09/The_Atlantic_-_Artwork_1_v6_copy.mp4" alt="Image">
                <figcaption>Image caption</figcaption>
            </figure>
            <h2>The Rise of Serverless PDF Generation</h2>
            <p>In the ever-evolving landscape of web development, the demand for dynamic content generation remains paramount. One common requirement is the creation of PDF documents directly from web applications, often for reports, invoices, or articles like this one. Traditionally, this task involved dedicated server-side libraries and infrastructure, which could be complex to manage and scale.</p>
            <p>However, the advent of serverless computing and edge functions has opened up new possibilities. Platforms like Cloudflare Workers, coupled with browser rendering engines accessible via APIs like Puppeteer, offer a compelling alternative. This approach shifts the heavy lifting of PDF rendering to the edge, closer to the user, potentially reducing latency and simplifying backend architecture.</p>
            <h4>Example H3 Heading</h4>
            <p>Short paragraph to test page break.</p>
            <p>Using a headless browser instance within a serverless function allows developers to leverage the full power of HTML and CSS to design their documents. This means intricate layouts, custom fonts, and dynamic data can be seamlessly incorporated into the final PDF output. The process typically involves generating HTML content, loading it into a browser page instance, and then invoking the PDF generation function provided by the browser automation library.</p>
            <p>This paragraph includes <em>emphasized text</em> and <strong>strongly emphasized text</strong>. It also includes a <a href="https://example.com">link</a> and some inline \\\`code example\\\`.</p>
            <ul>
                <li>Unordered list item 1</li>
                <li>Unordered list item 2
                    <ul>
                        <li>Nested item 2.1</li>
                        <li>Nested item 2.2</li>
                    </ul>
                </li>
                <li>Unordered list item 3</li>
            </ul>
            <figure>
                <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1721752376i/216052746.jpg" alt="Image">
                <figcaption>Believe by A.J. Jacobs</figcaption>
            </figure>
            <h2>The Rise of Serverless PDF Patriotism</h2>
            <p>This dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <ol>
                <li>Ordered list item 1</li>
                <li>Ordered list item 2</li>
                <li>Ordered list item 3</li>
            </ol>
            <pre><code>async function fetchAndProcessUsers(url: string) { // Added type for url
      try {
        const response = await fetch(url);
        if (!response.ok) {
          // Escaped dollar sign
          throw new Error(\`HTTP error! status: \\\${response.status}\`);
        }
        const users = await response.json();

        // Example processing: Filter active users and get their names
        // Added type for user
        const activeUserNames = users
          .filter((user: { isActive: boolean; name: string }) => user.isActive)
          .map((user: { name: string }) => user.name);

        console.log('Active users:', activeUserNames);
        return activeUserNames;
      } catch (error: any) { // Added type for error
        console.error('Error fetching or processing users:', error);
        return []; // Return empty array on error
      }
    }

    // Example usage:
    fetchAndProcessUsers('https://jsonplaceholder.typicode.com/users'); // Placeholder API</code></pre>
            <p>This dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat..</p>
            <blockquote>
                This is a blockquote. It is often used to quote text from another source. It should be indented and styled distinctively.
            </blockquote>
            <hr>
            <p>While challenges remain, such as managing resource limits and cold starts in serverless environments, the benefits of scalability, reduced operational overhead, and leveraging familiar web technologies make serverless PDF generation an increasingly attractive option for modern applications.</p>
            <table>
                <thead>
                  <tr>
                    <th>Header 1</th>
                    <th>Header 2</th>
                    <th>Header 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Data A1</td>
                    <td>Data B1</td>
                    <td>Data C1</td>
                  </tr>
                  <tr>
                    <td>Data A2</td>
                    <td>Data B2</td>
                    <td>Data C2</td>
                  </tr>
                  <tr>
                    <td>Data A3</td>
                    <td>Data B3</td>
                    <td>Data C3</td>
                  </tr>
                </tbody>
              </table>
              <p>This paragraph demonstrates <del>strikethrough text</del> using the del tag, <s>strikethrough text</s> using the s tag, and <mark>highlighted text</mark> using the mark tag.</p>
              <p>This is a paragraph.</p>
              <figure>
                <img src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5d4c163c-89ca-4508-bd03-c9a16c0cc853_754x455.png" alt="Image">
                <figcaption></figcaption>
              </figure>
              <p>This is a end of article paragraph.</p>
        </div>
`


export const mockContentOnlyText = `
<div class="content">
            <h2>The Rise of Serverless PDF Generation</h2>
            <p>In the ever-evolving landscape of web development, the demand for dynamic content generation remains paramount. One common requirement is the creation of PDF documents directly from web applications, often for reports, invoices, or articles like this one. Traditionally, this task involved dedicated server-side libraries and infrastructure, which could be complex to manage and scale.</p>
            <p>However, the advent of serverless computing and edge functions has opened up new possibilities. Platforms like Cloudflare Workers, coupled with browser rendering engines accessible via APIs like Puppeteer, offer a compelling alternative. This approach shifts the heavy lifting of PDF rendering to the edge, closer to the user, potentially reducing latency and simplifying backend architecture.</p>
            <h4>Example H3 Heading</h4>
            <p>Short paragraph to test page break.</p>
            <p>Using a headless browser instance within a serverless function allows developers to leverage the full power of HTML and CSS to design their documents. This means intricate layouts, custom fonts, and dynamic data can be seamlessly incorporated into the final PDF output. The process typically involves generating HTML content, loading it into a browser page instance, and then invoking the PDF generation function provided by the browser automation library.</p>
            <p>This paragraph includes <em>emphasized text</em> and <strong>strongly emphasized text</strong>. It also includes a <a href="https://example.com">link</a> and some inline \\\`code example\\\`.</p>
            <blockquote>
                This is a blockquote. It is often used to quote text from another source. It should be indented and styled distinctively.
            </blockquote>
            <hr>
            <p>While challenges remain, such as managing resource limits and cold starts in serverless environments, the benefits of scalability, reduced operational overhead, and leveraging familiar web technologies make serverless PDF generation an increasingly attractive option for modern applications.</p>
              <p>This paragraph demonstrates <del>strikethrough text</del> using the del tag, <s>strikethrough text</s> using the s tag, and <mark>highlighted text</mark> using the mark tag.</p>
              <p>This is a paragraph.</p>
              <p>This is a end of article paragraph.</p>
        </div>
`