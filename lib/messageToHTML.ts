export default function messageToHTML(message: string) {
    const startString = '<!DOCTYPE html>';
    const endString = '</html>';
    const start = message.indexOf(startString);
    const end = message.indexOf(endString);

    // use slice to extract the HTML document
    const html = message.slice(start, end + endString.length);

    return html

}
